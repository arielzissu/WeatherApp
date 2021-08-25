import React from 'react';
import { StyledCard } from 'src/utils/styledComponents.util';
import { Box, Button } from '@material-ui/core';
import WeaderCardsList from './weaderCardsList.cmp';
import { Favorite } from '@material-ui/icons';
import weatherImg from '../assets/imgs/sun.png';

export type Props = {
    daysOfDailyForecasts: any;
    isDarkMode: any;
    currentWeather: any;
    currentLocationOption: any;
    canRenderCardDetails: boolean;
    handleAddToFavorite: () => void;
    isFavoriteWeather: () => boolean;
};

export default function WeatherCardDetails(props: Props) {

    const { daysOfDailyForecasts, isDarkMode, currentWeather, currentLocationOption, canRenderCardDetails, isFavoriteWeather, handleAddToFavorite } = props;

    return (
        <StyledCard variant="outlined" style={isDarkMode ? { backgroundColor: 'gray', color: 'white' } : {}}>
            {canRenderCardDetails && currentLocationOption && (
                <>
                    <Box className="contain-header-weader-card">
                        <Box display="flex" alignItems="center">
                            <Box mr={2} className="weather-icon-contain"><img src={weatherImg} alt="Weather" style={{ width: 80, height: 80 }} /></Box>
                            <Box>
                                <Box>{currentLocationOption.LocalizedName}</Box>
                                {
                                    currentWeather &&
                                    <Box>{currentWeather.Temperature.Metric.Value} {currentWeather.Temperature.Metric.Unit}</Box>
                                }
                            </Box>
                        </Box>

                        <Button className="add-favorite-btn" style={isDarkMode ? { color: 'white' } : {}} onClick={handleAddToFavorite}><Favorite htmlColor={isFavoriteWeather() ? "blue" : ""} className="love-icon" />Add to favorite</Button>
                    </Box>

                    {
                        isFavoriteWeather() &&
                        <Box textAlign="center" mb={3}>
                            <Box fontSize={'20px'} color="blue" fontWeight="700">In Favorite</Box>
                        </Box>
                    }

                    <Box textAlign="center" mb={3}>
                        <Box fontSize={'20px'}>Scattered cloud</Box>
                    </Box>

                    <Box className="contain-cards">
                        <WeaderCardsList daysOfDailyForecasts={daysOfDailyForecasts} />
                    </Box>
                </>
            )}
        </StyledCard>
    )
}
