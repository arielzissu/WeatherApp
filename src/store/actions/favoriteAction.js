
export function addFavorite(favorite) {
    return async dispatch => {
        dispatch({ type: 'ADD_FAVORITE', favorite });
        return favorite;
    }
}

export function deleteFavorite(favoriteId) {
    return async dispatch => {
        dispatch({ type: 'DELETE_FAVORITE', favoriteId })
    }
}
export function saveFavorite(favorite) {
    return async dispatch => {
        dispatch({ type: 'SAVE_FAVORITE', favorite });
        return favorite;
    }
}