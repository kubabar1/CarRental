// eslint-disable-next-line @typescript-eslint/no-var-requires
const compiler = require('./compiler');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const utils = require('./utils');

compiler.hooks.run.tap('RunPlugin', (params) => {
    console.log(`➤ Compiling module ${chalk.blue(params.name)} ...`);
});

compiler.run(utils.compilationHandler);
