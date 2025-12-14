const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const dataPath = path.join(__dirname, '../src/data/sportif18.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    console.log('Seeding data...');

    // 1. Seed Routes
    if (data.routes) {
        for (const [day, url] of Object.entries(data.routes)) {
            await prisma.dayRoute.upsert({
                where: { day },
                update: { url },
                create: { day, url },
            });
        }
        console.log('Routes seeded.');
    }

    // 2. Seed Competitions
    if (data.competitions) {
        for (const comp of data.competitions) {
            // Upsert competition
            const createdComp = await prisma.competition.upsert({
                where: { id: comp.id },
                update: {
                    title: comp.title,
                    icon: comp.icon,
                    color: comp.color,
                    bracketType: comp.bracketType || 'single',
                    grandFinal: comp.grandFinal || {},
                    bracket: comp.bracket || [],
                    bracketLeft: comp.bracketLeft || [],
                    bracketRight: comp.bracketRight || [],
                    rulesList: comp.rules || [],
                },
                create: {
                    id: comp.id, // Keep original ID
                    title: comp.title,
                    icon: comp.icon,
                    color: comp.color,
                    bracketType: comp.bracketType || 'single',
                    grandFinal: comp.grandFinal || {},
                    bracket: comp.bracket || [],
                    bracketLeft: comp.bracketLeft || [],
                    bracketRight: comp.bracketRight || [],
                    rulesList: comp.rules || [],
                },
            });

            // Handle Relations (Delete existing to simpler sync, then create)

            // Leaderboard
            await prisma.leaderboardEntry.deleteMany({ where: { competitionId: createdComp.id } });
            if (comp.leaderboard && comp.leaderboard.length > 0) {
                await prisma.leaderboardEntry.createMany({
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
            await prisma.scheduleItem.deleteMany({ where: { competitionId: createdComp.id } });
            if (comp.schedule && comp.schedule.length > 0) {
                await prisma.scheduleItem.createMany({
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
            await prisma.contactPerson.deleteMany({ where: { competitionId: createdComp.id } });
            if (comp.cps && comp.cps.length > 0) {
                await prisma.contactPerson.createMany({
                    data: comp.cps.map(cp => ({
                        name: cp.name,
                        phone: cp.phone,
                        competitionId: createdComp.id
                    }))
                });
            }
        }
        console.log('Competitions seeded.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
