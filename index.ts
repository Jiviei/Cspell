import { validateText, combineTextAndLanguageSettings, finalizeSettings, getDefaultSettings } from 'cspell-lib';

const customWords = ['wordz', 'cuztom', 'clockz'];

export const SpellcheckerFactory = async (customWords: string[] = []) => {
    const settings = {
        ...getDefaultSettings(),
        enabledLanguageIds: [],
        words: customWords,
    };

    const fileSettings = combineTextAndLanguageSettings(settings, '', ['plaintext']);
    const finalSettings = finalizeSettings(fileSettings);

    return async (phrase: string) => {
        return await validateText(phrase, finalSettings, { generateSuggestions: true });
    };
};

export const checkSpelling = async (phrase: string) => {
    const spellChecker = await SpellcheckerFactory(customWords);

    return spellChecker(phrase);
};

async function run() {
    const r = await checkSpelling('These are my coztom wordz.');
    console.log('%o', r);
}

run();