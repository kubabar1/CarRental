// eslint-disable-next-line @typescript-eslint/no-var-requires
const compiler = require('./compiler');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const utils = require('./utils');

compiler.watch(
    {
        aggregateTimeout: 300,
        poll: undefined,
    },
    utils.compilationHandler
);
