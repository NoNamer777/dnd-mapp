import { nanoid } from 'nanoid';
import * as yargs from 'yargs';
import { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

async function main() {
    const { numberOfIds } = await (yargs(hideBin(process.argv)) as Argv<{ numberOfIds: number }>)
        .usage('Usage: ts-node generate-ids [numberOfIds]')
        .command('$0 [numberOfIds]', 'Generate a number of random IDs', (yargs) => {
            yargs
                .positional('numberOfIds', {
                    description: 'Number of random IDs to generate',
                    type: 'number',
                })
                .default({ numberOfIds: 5 });
        })
        .help().argv;

    for (let i = 0; i < numberOfIds; i++) console.log(nanoid());
}

main();
