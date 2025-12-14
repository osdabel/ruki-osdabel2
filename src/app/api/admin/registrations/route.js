import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
    try {
        const registrations = await prisma.registration.findMany({
            include: {
                competition: {
                    select: { title: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(registrations, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
            }
        });
    } catch (error) {
        console.error("Admin Registration Error:", error);
        return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
    }
}
