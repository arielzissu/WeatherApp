const initialState = {
    isDarkMode: false,
}

export default function DarkModeReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_DARK_MODE':
            return { ...state, isDarkMode: action.isDarkMode };
        default:
            return state;
    };
}