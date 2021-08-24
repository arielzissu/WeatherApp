import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Box, TextField, Card, Button, IconButton, Collapse } from '@material-ui/core';
import { Favorite, Close } from '@material-ui/icons';
import { connect } from "react-redux";
import { addFavorite, deleteFavorite } from '../store/actions/favoriteAction';
import { LocationService } from '../services/location.service';
import { Autocomplete, Alert } from '@material-ui/lab';
import { LocationOptionsObj, defaultLocationOptionTLV, CurrentWeatherObj, DailyForecastsObj } from '../models/weather.model';
import { getRandomArbitrary } from 'src/utils/getRundomNumber.util';
export const WeaderCard = styled(Box)` && {
    border: 1px solid black;
    padding: 20px;
    min-width: 150px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 10px;
    @media screen and (max-width: 1140px) {
        width: 60%;
        margin-right: 0;
        margin-bottom: 20px;
    }
}`;
export const StyledCard = styled(Card)` && {
    padding: 40px;
    min-height: 60%;
    @media screen and (max-width: 900px) {
        padding: 10px;
    }
}`;

export function WeatherPage(props: any) {
    const [isOpenAlertWarning, setIsOpenAlertWarning] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');

    const [searchLocationInput, setSearchLocationInput] = useState<string>('');

    const [locationsOptions, setLocationsOptions] = useState<LocationOptionsObj[]>(null);
    const [currentLocationOption, setCurrentLocationOption] = useState<LocationOptionsObj>(defaultLocationOptionTLV);
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherObj>(null);
    const [daysOfDailyForecasts, setDaysOfDailyForecasts] = useState<DailyForecastsObj[]>(null);


    const errorHandler = (err: string, description: string) => {
        setErrorText(description);
        setIsOpenAlertWarning(true);
        setTimeout(() => {
            setIsOpenAlertWarning(false);
        }, 5000);
    }

    const getCurrentWeather = async (locationKey?: string) => {
        const data = await LocationService.getCurrentWeather(errorHandler, locationKey);
        const currentWeatherData = data[0];
        setCurrentWeather(currentWeatherData);
    }
    const handleGetDaysOfDailyForecasts = async (value?: LocationOptionsObj) => {
        const { data: daysOfDailyForecasts } = await LocationService.getDaysOfDailyForecasts(errorHandler, value?.Key);
        setDaysOfDailyForecasts(daysOfDailyForecasts.DailyForecasts);
    }

    const getDefaultWeatherOfTLV = async () => {
        await getCurrentWeather();
        await handleGetDaysOfDailyForecasts();
    }

    useEffect(() => {
        getDefaultWeatherOfTLV();
    }, [])

    const onChangeInput = async (e) => {
        const { value } = e.target;
        setSearchLocationInput(value);
        const { data: locationsOptionsData } = await LocationService.getLocationsOptions(value, errorHandler);
        setLocationsOptions(locationsOptionsData);
    }

    const onChangeAutoComplete = async (e: any, value: LocationOptionsObj) => {
        setCurrentLocationOption(value);
        await handleGetDaysOfDailyForecasts(value);
    }

    const handleAddToFavorite = () => {
        const newFavorite = {
            id: getRandomArbitrary(1, 999999),
            LocalizedName: currentLocationOption.LocalizedName,
            Key: currentLocationOption.Key,
            Temperature: currentWeather.Temperature,
        }
        props.addFavorite(newFavorite);
    }



    return (
        <Box height="100%">
            <Box className="autocomplete-contain">
                <Autocomplete
                    options={locationsOptions ?? []}
                    freeSolo={true}
                    onChange={onChangeAutoComplete}
                    getOptionLabel={(option) => option.LocalizedName}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Add city name" value={searchLocationInput} onChange={onChangeInput} />
                    )}
                />
            </Box>

            {
                daysOfDailyForecasts && (
                    <StyledCard variant="outlined">
                        <Box className="contain-header-weader-card">
                            <Box display="flex" alignItems="center">
                                <Box>X</Box>
                                <Box>
                                    <Box>{currentLocationOption.LocalizedName}</Box>
                                    {
                                        currentWeather &&
                                        <Box>{currentWeather.Temperature.Metric.Value} {currentWeather.Temperature.Metric.Unit}</Box>
                                    }
                                </Box>
                            </Box>

                            <Button className="add-favorite-btn" onClick={handleAddToFavorite}><Favorite className="love-icon" /> Add to favorite</Button>
                        </Box>

                        <Box textAlign="center" mb={3}>
                            <Box fontSize={'20px'}>Scattered cloud</Box>
                        </Box>

                        <Box className="contain-cards">
                            {daysOfDailyForecasts.map((d, idx) => (
                                <WeaderCard key={idx}>
                                    <Box>{dayjs(d.Date).format('ddd')}</Box>
                                    <Box>{d.Temperature.Maximum.Value} {d.Temperature.Maximum.Unit}</Box>
                                </WeaderCard>
                            ))}
                        </Box>

                        <Collapse in={isOpenAlertWarning} style={{ position: 'fixed', bottom: 10, left: 10, padding: 10 }}>
                            <Alert
                                severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setIsOpenAlertWarning(false);
                                        }}
                                    >
                                        <Close fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {errorText}
                            </Alert>
                        </Collapse>
                    </StyledCard>
                )
            }

        </Box>
    )
}

const mapStateToProps = (state) => ({
    favorites: state.favorite.favorites,
});

const mapDispatchToProps = {
    addFavorite,
    deleteFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
