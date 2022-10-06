// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalkAnimation = require('chalk-animation');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const banner = require('./banner');

const dist = path.resolve(__dirname, '..', 'dist');
const static = path.join(dist, 'static');

const app = express();
const PORT = 3030;

app.listen(PORT, () => {
    console.log(`Server started on port: ${chalk.green(PORT)}`);
    chalkAnimation.rainbow(banner);
});

app.use(express.static(static));

app.get('/login*', (req, res) => res.sendFile(path.join(dist, 'login-page', 'login.html')));
app.get('/profile*', (req, res) => res.sendFile(path.join(dist, 'profile-page', 'profile.html')));
app.get('/registration*', (req, res) => res.sendFile(path.join(dist, 'registration-page', 'registration.html')));
app.get('/reservation-status*', (req, res) =>
    res.sendFile(path.join(dist, 'reservation-page', 'reservation_status.html'))
);
app.get('/reservation*', (req, res) => res.sendFile(path.join(dist, 'reservation-page', 'reservation.html')));
app.get('/*', (req, res) => res.sendFile(path.join(dist, 'main-page', 'main.html')));
