import { Races } from '@dnd-mapp/data';
import { createId } from '@paralleldrive/cuid2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
    try {
        const raceNames = Object.values(Races);

        await prisma.race.createMany({
            data: raceNames.map((name) => ({ id: createId(), name: name })),
        });

        await prisma.$disconnect();
    } catch (error) {
        console.error(error);

        await prisma.$disconnect();

        process.exit(1);
    }
})();
