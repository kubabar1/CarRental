// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loginPageConfig = require('../login-page/webpack.config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mainPageConfig = require('../main-page/webpack.config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const profilePageConfig = require('../profile-page/webpack.config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const registrationPageConfig = require('../registration-page/webpack.config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reservationPageConfig = require('../reservation-page/webpack.config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const resetPasswordPageConfig = require('../reset-password-page/webpack.config.js');

const compiler = webpack([
    loginPageConfig,
    mainPageConfig,
    profilePageConfig,
    registrationPageConfig,
    reservationPageConfig,
    resetPasswordPageConfig,
]);

module.exports = compiler;
