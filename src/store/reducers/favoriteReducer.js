const initialState = {
    favorites: [],
}

export default function FavoriteReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            console.log('added to favorite!!!', [...state.favorites, action.favorite]);
            return { ...state, favorites: [...state.favorites, action.favorite] };
        case 'DELETE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.id !== action.favoriteId)
            };
        default:
            return state;
    };
}