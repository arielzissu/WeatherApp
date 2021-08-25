
export function updateIsDarkMode(isDarkMode) {
    return async dispatch => {
        dispatch({ type: 'UPDATE_DARK_MODE', isDarkMode });
        return isDarkMode;
    }
}