import i18next, { i18n } from 'i18next';
import format from 'string-template';
import Cookies from 'universal-cookie';

export class TranslationService {
    private static instance: i18n;
    private static fallbackLng = 'en';

    static getInstance = (): i18n => {
        if (!TranslationService.instance) {
            TranslationService.instance = i18next.createInstance();
            TranslationService.instance.init({
                fallbackLng: TranslationService.fallbackLng,
            });
            return TranslationService.instance;
        } else {
            return TranslationService.instance;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static configureDefault = (namespace: string, translationsEn: any, translationsPl: any): void => {
        TranslationService.getInstance().addResources('en', namespace, translationsEn);
        TranslationService.getInstance().addResources('pl', namespace, translationsPl);
        TranslationService.getInstance().setDefaultNamespace(namespace);
        TranslationService.getInstance().changeLanguage(TranslationService.getLanguageCookie());
    };

    static changeLanguage = (value: string): void => {
        TranslationService.setLanguageCookie(value ? value : TranslationService.fallbackLng);
        TranslationService.getInstance().changeLanguage(value);
    };

    static setLanguageCookie = (value: string): void => {
        new Cookies().set('lang', value, { path: '/' });
    };

    static getLanguageCookie = (): string => {
        return new Cookies().get('lang');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static translate = (key: string, translationObjects: any[] = []): string => {
        return format(TranslationService.getInstance().t(key), translationObjects);
    };
}
