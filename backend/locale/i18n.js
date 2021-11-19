import path from 'path'
const i18n = require("i18n")

// factory function for centralizing config;
// either register i18n for global use in handling HTTP requests,
// or register it as `i18nObj` for local CLI use
const configureI18n = (isGlobal) => {
    let i18nObj = {};
    i18n.configure({
        defaultLocale: "vi",
        locales:['vi', 'en'],
        register: isGlobal ? global : i18nObj,
        directory: path.join(__dirname),
        autoReload: true,
        objectNotation: true,
        cookie: 'lang'
    });
    return [i18n, i18nObj];
};

module.exports = configureI18n;

