import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { FavoriteCard } from 'src/utils/styledComponents.util';
import { FavoriteObj } from 'src/models/weather.model';
import { Close } from '@material-ui/icons';

export type Props = {
    favoritesData: FavoriteObj[];
    onDeleteFavorite: (favoriteId: number) => void;
    onClickFavoriteCard: (favorite: FavoriteObj) => void;
};

export default function FavoriteCardsList(props: Props) {
    const { favoritesData, onDeleteFavorite, onClickFavoriteCard } = props;

    const onHandleDeleteFavorite = (e: any, favoriteId: number) => {
        e.stopPropagation();
        onDeleteFavorite(favoriteId);
    }

    const onHandleClickFavoriteCard = (favorite: FavoriteObj) => {
        onClickFavoriteCard(favorite);
    }


    return (
        <>
            {
                favoritesData.length > 0 ? (
                    favoritesData.map(d => (
                        <FavoriteCard key={d.id} onClick={() => onHandleClickFavoriteCard(d)}>
                            <Tooltip title="Delete">
                                <Close className="close-icon" onClick={(e) => onHandleDeleteFavorite(e, d.id)} />
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
        </>
    )
}
