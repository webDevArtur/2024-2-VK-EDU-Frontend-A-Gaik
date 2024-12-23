export const fetchTranslation = async (query: string, fromLanguage: string, toLanguage: string) => {
    const api = `https://api.mymemory.translated.net/get?q=${query}&langpair=${fromLanguage}|${toLanguage}`;
    const response = await fetch(api);
    const data = await response.json();
    return data.responseData;
};
