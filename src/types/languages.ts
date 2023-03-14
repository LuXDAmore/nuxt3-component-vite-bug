// Types
enum LanguagesType {
    IT = 'it',
    EN = 'en',
    ES = 'es',
}

type LanguagesToStringType = LanguagesType.IT | LanguagesType.EN | LanguagesType.ES ;

type LanguagesValuesType = {
    [ LanguagesType.IT ]: string;
    [ LanguagesType.EN ]?: string;
    [ LanguagesType.ES ]?: string;
};

// Exports
export { LanguagesType };
export type {
    LanguagesToStringType,
    LanguagesValuesType,
};
