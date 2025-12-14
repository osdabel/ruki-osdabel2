import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
    try {
        // Fetch all data
        const dayRoutes = await prisma.dayRoute.findMany();
        const competitions = await prisma.competition.findMany({
            include: {
                leaderboard: {
                    orderBy: { rank: 'asc' }
                },
                schedule: {
                    orderBy: { id: 'asc' } // Or by time/day if properly formatted, but ID preserve insertion order roughly
                },
                cps: true,
                // rules are in rulesList scalar
            },
            orderBy: { id: 'asc' }
        });

        // Transform to expected JSON format
        const routes = {};
        dayRoutes.forEach(r => routes[r.day] = r.url);

        const formattedCompetitions = competitions.map(comp => ({
            id: comp.id,
            title: comp.title,
            icon: comp.icon,
            color: comp.color,
            bracketType: comp.bracketType,
            grandFinal: comp.grandFinal || {},
            bracket: comp.bracket || [],
            bracketLeft: comp.bracketLeft || [],
            bracketRight: comp.bracketRight || [],
            schedule: comp.schedule,
            leaderboard: comp.leaderboard,
            cps: comp.cps,
            rules: comp.rulesList
        }));

        const data = {
            routes,
            competitions: formattedCompetitions
        };

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Transaction to ensure data integrity
        await prisma.$transaction(async (tx) => {

            // 1. Update Routes
            if (body.routes) {
                for (const [day, url] of Object.entries(body.routes)) {
                    await tx.dayRoute.upsert({
                        where: { day },
                        update: { url },
                        create: { day, url }
                    });
                }
            }

            // 2. Update Competitions
            if (body.competitions) {
                // Determine IDs to keep (for deletion if needed, though usually we don't delete competitions via bulk save often, 
                // but the admin UI might delete them. The UI sends the full list.
                // If we want to support deletion, we should fetch all IDs first and delete those not in body.
                // For now, let's just Upsert current ones.
                const incomingIds = body.competitions.map(c => c.id).filter(id => id);

                // Delete removed competitions
                await tx.competition.deleteMany({
                    where: {
                        id: { notIn: incomingIds }
                    }
                });

                for (const comp of body.competitions) {
                    const compData = {
                        title: comp.title,
                        icon: comp.icon,
                        color: comp.color,
                        bracketType: comp.bracketType || 'single',
                        grandFinal: comp.grandFinal || {},
                        bracket: comp.bracket || [],
                        bracketLeft: comp.bracketLeft || [],
                        bracketRight: comp.bracketRight || [],
                        rulesList: comp.rules || []
                    };

                    let createdComp;
                    if (comp.id) {
                        createdComp = await tx.competition.upsert({
                            where: { id: comp.id },
                            update: compData,
                            create: { ...compData, id: comp.id }
                        });
                    } else {
                        createdComp = await tx.competition.create({
                            data: compData
                        });
                    }

                    // Replace Sub-items (Delete All -> Create All)

                    // Leaderboard
                    await tx.leaderboardEntry.deleteMany({ where: { competitionId: createdComp.id } });
                    if (comp.leaderboard?.length) {
                        await tx.leaderboardEntry.createMany({
                            data: comp.leaderboard.map(lb => ({
                                rank: parseInt(lb.rank),
                                team: lb.team,
                                wins: parseInt(lb.wins) || 0,
                                losses: parseInt(lb.losses) || 0,
                                notes: lb.notes || '',
                                competitionId: createdComp.id
                            }))
                        });
                    }

                    // Schedule
                    await tx.scheduleItem.deleteMany({ where: { competitionId: createdComp.id } });
                    if (comp.schedule?.length) {
                        await tx.scheduleItem.createMany({
                            data: comp.schedule.map(sch => ({
                                day: sch.day,
                                time: sch.time,
                                match: sch.match,
                                status: sch.status,
                                competitionId: createdComp.id
                            }))
                        });
                    }

                    // CPs
                    await tx.contactPerson.deleteMany({ where: { competitionId: createdComp.id } });
                    if (comp.cps?.length) {
                        await tx.contactPerson.createMany({
                            data: comp.cps.map(cp => ({
                                name: cp.name,
                                phone: cp.phone,
                                competitionId: createdComp.id
                            }))
                        });
                    }
                }
            }
        });

        return NextResponse.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: 'Failed to save data: ' + error.message }, { status: 500 });
    }
}
