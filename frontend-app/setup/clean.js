// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commandLineArgs = require('command-line-args');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const getDirectories = (source) =>
    fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => path.join(source, dirent.name));

const optionDefinitions = [
    { name: 'all', alias: 'a', type: Boolean, defaultOption: false },
    { name: 'full', alias: 'f', type: Boolean, defaultOption: false },
];

const options = commandLineArgs(optionDefinitions);

const cleanAll = !!options.all;
const cleanFull = !!options.full;

fs.rmSync(path.join(process.cwd(), 'dist'), { recursive: true, force: true });

if (cleanFull) {
    fs.rmSync(path.join(process.cwd(), 'node_modules'), { recursive: true, force: true });
}

if (cleanAll) {
    getDirectories(process.cwd())
        .map((d) => path.join(d, 'dist'))
        .filter((d) => fs.existsSync(d))
        .forEach((d) => fs.rmSync(d, { recursive: true, force: true }));
    if (cleanFull) {
        getDirectories(process.cwd())
            .map((d) => path.join(d, 'node_modules'))
            .filter((d) => fs.existsSync(d))
            .forEach((d) => fs.rmSync(d, { recursive: true, force: true }));
    }
}
