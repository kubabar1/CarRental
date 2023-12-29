// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require('https');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commander = require('commander');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require(`fs`);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const banner = require('./banner');

commander
    .option('--useHttps', 'Deploy on https', false)
    .option('--httpsKey <key-path>', 'Key file path')
    .option('--httpsCert <cert-path>', 'Cert file path')
    .parse(process.argv);

const dist = path.resolve(__dirname, '..', 'dist');
const static = path.join(dist, 'static');
const options = commander.opts();
const useHttps = options.useHttps;

const app = express();
const PORT = 3030;

app.use(express.static(static));

app.get('/login*', (req, res) => res.sendFile(path.join(dist, 'login-page', 'login.html')));
app.get('/reset-password*', (req, res) => res.sendFile(path.join(dist, 'reset-password-page', 'reset-password.html')));
app.get('/profile*', (req, res) => res.sendFile(path.join(dist, 'profile-page', 'profile.html')));
app.get('/registration*', (req, res) => res.sendFile(path.join(dist, 'registration-page', 'registration.html')));
app.get('/reservation-status*', (req, res) =>
    res.sendFile(path.join(dist, 'reservation-page', 'reservation_status.html'))
);
app.get('/reservation*', (req, res) => res.sendFile(path.join(dist, 'reservation-page', 'reservation.html')));
app.get('/*', (req, res) => res.sendFile(path.join(dist, 'main-page', 'main.html')));

if (useHttps) {
    const httpsKey= options.httpsKey;
    const httpsCert= options.httpsCert;

    if (!httpsKey) { // client-key.pem
        throw new Error('Key pem file path not set');
    }
    if (!fs.existsSync(httpsKey)) { // client-key.pem
        throw new Error(`Key pem file '${httpsKey}' does not exists`);
    }
    if (!httpsCert) { // client-cert.pem
        throw new Error('Cert pem file path not set');
    }
    if (!fs.existsSync(httpsCert)) { // client-cert.pem
        throw new Error(`Cert pem file '${httpsCert}' does not exists`);
    }

    const httpsOptions = {
        key: fs.readFileSync(httpsKey),
        cert: fs.readFileSync(httpsCert)
    };

    https.createServer(httpsOptions, app).listen(PORT, () => {
        console.log(`Server started on port (on https): ${chalk.green(PORT)}`);
        console.log(`${chalk.red(banner)}`);
    });
} else {
    http.createServer(app).listen(PORT, () => {
        console.log(`Server started on port: ${chalk.green(PORT)}`);
        console.log(`${chalk.red(banner)}`);
    });
}
