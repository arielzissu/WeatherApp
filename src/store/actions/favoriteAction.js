
export function addFavorite(favorite) {
    console.log('favorite is: ', favorite);
    return async dispatch => {
        // contact = await ContactService.saveContact(contact);
        dispatch({ type: 'ADD_FAVORITE', favorite });
        return favorite;
    }
}

export function deleteFavorite(favoriteId) {
    return async dispatch => {
        // await ContactService.deleteContact(contactId);
        dispatch({ type: 'DELETE_FAVORITE', favoriteId })
    }
}