import { getDefaultSettings, mergeSettings, readSettings, suggestionsForWord, validateText} from 'cspell-lib';

const customWords = ['wordz', 'cuztom', 'clockz'];


export const SpellcheckerFactory = async (customWords: string[] = []) => {
    return async (text: string) => {
        const settings = mergeSettings(await getDefaultSettings(false), await readSettings("@cspell\\dict-ru_ru\\cspell-ext.json"), await readSettings("@cspell\\dict-en-gb\\cspell-ext.json"))
        return await validateText(text, {...settings, dictionaries: ["ru-ru", "en-gb"], words: ["coztom"]}, {
            generateSuggestions: true,
        });
    };
    return async (text: string) => {
        const settings = mergeSettings(await getDefaultSettings(false), await readSettings("@cspell\\dict-ru_ru\\cspell-ext.json"))
        return await suggestionsForWord(text, {
            dictionaries: ["ru-ru"],
        }, settings);
    };
};

export const checkSpelling = async (text: string) => {
    const spellChecker = await SpellcheckerFactory(customWords);
    return spellChecker(text);
};
async function run() {
    console.log('%o', await checkSpelling('привет праграмист world These are my coztom'));
}

run();