import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { WeaderCard } from './weather.page';
import { Box, Tooltip } from '@material-ui/core';
import { addFavorite, deleteFavorite } from '../store/actions/favoriteAction';
import { FavoriteObj } from '../models/weather.model';
import { Close } from '@material-ui/icons';

export const FavoriteCard = styled(WeaderCard)` && {
    position: relative;
    margin-right: 0;
}`;

export function FavoritePage(props: any) {
    const [favoritesData, setFavoritesData] = useState<FavoriteObj[]>([]);

    useEffect(() => {
        if (props.favorites?.length > 0) {
            setFavoritesData(props.favorites);
        }
    }, [props.favorites]);

    const onDeleteFavorite = (favoriteId) => {
        props.deleteFavorite(favoriteId);
    }


    return (
        <section>
            <Box className="container-favorite-cards">
                {
                    favoritesData.length > 0 ? (
                        favoritesData.map(d => (
                            <FavoriteCard key={d.id}>
                                <Tooltip title="Delete">
                                    <Close className="close-icon" onClick={() => onDeleteFavorite(d.id)} />
                                </Tooltip>
                                <Box>{d.LocalizedName}</Box>
                                <Box>{d.Temperature.Metric.Value} {d.Temperature.Metric.Unit}</Box>
                            </FavoriteCard>
                        )))
                        : (
                            <Box>
                                <Box>Empty favorite...</Box>
                            </Box>
                        )
                }
            </Box>
        </section>
    )
}

const mapStateToProps = (state) => ({
    favorites: state.favorite.favorites,
});

const mapDispatchToProps = {
    addFavorite,
    deleteFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
