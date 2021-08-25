import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from '@material-ui/core';
import { deleteFavorite, saveFavorite } from '../store/actions/favoriteAction';
import { FavoriteObj } from '../models/weather.model';
import FavoriteCardsList from '../cmps/favoriteCardList.cmp';
import { Routes } from '../routes/route';

export function FavoritePage(props: any) {
    const [favoritesData, setFavoritesData] = useState<FavoriteObj[]>([]);
    const history = useHistory();

    useEffect(() => {
        if (props.favorites) {
            setFavoritesData(props.favorites);
        }
    }, [props.favorites]);

    const onDeleteFavorite = (favoriteId: number) => {
        props.deleteFavorite(favoriteId);
    }

    const onClickFavoriteCard = (favorite: FavoriteObj) => {
        history.push(Routes.WEATHER);
        props.saveFavorite(favorite);
    }

    return (
        <Box className="container-favorite-cards">
            <FavoriteCardsList
                favoritesData={favoritesData}
                onDeleteFavorite={onDeleteFavorite}
                onClickFavoriteCard={onClickFavoriteCard}
            />
        </Box>
    )
}

const mapStateToProps = (state) => ({
    favorites: state.favorite.favorites,
});

const mapDispatchToProps = {
    deleteFavorite,
    saveFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
