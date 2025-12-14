import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, class: className, teamName, phone, competitionId } = body;

        if (!name || !className || !teamName || !phone || !competitionId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const registration = await prisma.registration.create({
            data: {
                name,
                class: className,
                teamName,
                phone,
                competitionId: parseInt(competitionId)
            }
        });

        return NextResponse.json(registration, { status: 201 });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
    }
}
