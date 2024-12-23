import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryItem {
    text: string;
    translatedText: string;
    fromLanguage: string;
    toLanguage: string;
}

interface HistoryState {
    items: HistoryItem[];
}

const initialState: HistoryState = {
    items: JSON.parse(localStorage.getItem('history') || '[]'),
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addTranslation(state, action: PayloadAction<HistoryItem>) {
            state.items.push(action.payload);
            localStorage.setItem('history', JSON.stringify(state.items));
        },
        clearHistory(state) {
            state.items = [];
            localStorage.setItem('history', '[]');
        },
    },
});

export const { addTranslation, clearHistory } = historySlice.actions;
export default historySlice.reducer;
