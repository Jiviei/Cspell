import { getDefaultSettings, mergeSettings, readSettings, suggestionsForWord, validateText } from 'cspell-lib';

export const SpellcheckerFactory = async (text: string, customdictionary: string[] = [], incorectdictionary: string[] = []) => {
    const settings = mergeSettings(
        await getDefaultSettings(false),
        await readSettings("@cspell\\dict-ru_ru\\cspell-ext.json"),
        await readSettings("@cspell\\dict-en-gb\\cspell-ext.json"))
    return await validateText(text, {
        ...settings,
        minWordLength: 1,
        dictionaries: ["ru-ru", "en-gb"],
        ignoreWords: customdictionary,
        flagWords:  [...incorectdictionary]
    }, {
        generateSuggestions: true,
        numSuggestions: 5
    });
};

interface answer {
    text: string,
    offset: number,
    line: { text: string, offset: number },
    isFlagged?: boolean,
    suggestions?: string[],
    suggestionsEx?: any[]
}

async function run() {
    const text = 'привет праграмист world These\n are my coztom wordz гитхаб пять ГГц Около ёж ёмкость емкость жжёт';
    const customWords = ['wordz', 'cuztom', 'clockz'];
    const reg = /\w*ё\w*/g
    const incorectwords = ["пять: 5", "около"]
    var answers: answer[] = await SpellcheckerFactory(text, customWords, incorectwords)
    answers.map(answer => {
        console.log(answer.text + ":", answer.suggestions)
    });
}

run();