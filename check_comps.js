const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listCompetitions() {
    const comps = await prisma.competition.findMany({
        select: { id: true, title: true }
    });
    console.log(JSON.stringify(comps, null, 2));
}

listCompetitions()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
