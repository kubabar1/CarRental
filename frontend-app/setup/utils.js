// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

const compilationHandler = (err, stats) => {
    stats.stats
        .sort((a, b) => a.compilation.name - b.compilation.name)
        .forEach((stat) => {
            const compilation = stat.compilation;
            const moduleName = compilation.name;
            const assets = compilation.assets;
            const errors = compilation.errors;
            const warnings = compilation.warnings;

            const compilationStatus = !errors.length
                ? !warnings.length
                    ? chalk.green('success')
                    : chalk.yellow('warnings')
                : chalk.red('errors');

            console.log(chalk.blue(moduleName.toUpperCase()));
            console.log(`Compilation of module ${chalk.blue(moduleName)} finished with ${compilationStatus}\n`);
            console.log('Emitted assets:');
            Object.keys(assets).forEach((asset) => console.log(chalk.green(`✓ ${asset}`)));

            if (errors.length) {
                console.log(chalk.red('Errors: '));
                errors.forEach((error) => {
                    const errorMessage = formatErrorOutput(error);
                    if (errorMessage) {
                        console.log(chalk.red(`✗ ${errorMessage}`));
                    }
                });
            }
            if (warnings.length) {
                console.log(chalk.yellow('Warnings: '));
                warnings.forEach((warning) => {
                    const warningMessage = formatWarningOutput(warning);
                    if (warningMessage) {
                        console.log(chalk.yellow(`⚠ ${warningMessage}`));
                    }
                });
            }
            console.log('\n');
        });
};

function formatErrorOutput(error) {
    if (error.error && error.details) {
        return `${error.error} ${error.details}`;
    } else if (error.error) {
        return error.error;
    } else if (error.message) {
        return error.message;
    } else {
        return error;
    }
}

function formatWarningOutput(warning) {
    return warning;
}

module.exports = {
    compilationHandler: compilationHandler,
};
