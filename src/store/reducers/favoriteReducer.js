const initialState = {
    favorites: [],
    currentFavorite: null,
}

export default function FavoriteReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return { ...state, favorites: [...state.favorites, action.favorite] };
        case 'SAVE_FAVORITE':
            return { ...state, currentFavorite: action.favorite };
        case 'DELETE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.id !== action.favoriteId)
            };
        default:
            return state;
    };
}