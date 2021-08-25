import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, IconButton, Collapse } from '@material-ui/core';
import { Favorite, Close } from '@material-ui/icons';
import { connect } from "react-redux";
import { addFavorite, saveFavorite } from '../store/actions/favoriteAction';
import { LocationService } from '../services/location.service';
import { Autocomplete, Alert } from '@material-ui/lab';
import { LocationOptionsObj, defaultLocationOptionTLV, CurrentWeatherObj, DailyForecastsObj } from '../models/weather.model';
import { getRandomArbitrary } from '../utils/getRundomNumber.util';
import WeaderCardsList from '../cmps/weaderCardsList.cmp';
import { StyledCard } from '../utils/styledComponents.util';
import weatherImg from '../assets/imgs/sun.png';

export function WeatherPage(props: any) {
    const [isOpenAlertWarning, setIsOpenAlertWarning] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');

    const [searchLocationInput, setSearchLocationInput] = useState<string>('');

    const [locationsOptions, setLocationsOptions] = useState<LocationOptionsObj[]>([]);
    const [currentLocationOption, setCurrentLocationOption] = useState<LocationOptionsObj>(props.currentFavorite ? undefined : defaultLocationOptionTLV);
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
        const res = await LocationService.getCurrentWeather(errorHandler, locationKey);
        const currentWeatherData = res.data[0];
        setCurrentWeather(currentWeatherData);
    }
    const handleGetDaysOfDailyForecasts = async (value?: LocationOptionsObj) => {
        const res = await LocationService.getDaysOfDailyForecasts(errorHandler, value?.Key);
        setDaysOfDailyForecasts(res?.data?.DailyForecasts);
    }

    const getDefaultWeatherOfTLV = async () => {
        await getCurrentWeather();
        await handleGetDaysOfDailyForecasts();
    }
    const getDefaultWeatherOfFavorite = async () => {
        const { currentFavorite } = props;
        await getCurrentWeather(currentFavorite.key);
        await handleGetDaysOfDailyForecasts(currentFavorite);
        setCurrentLocationOption(currentFavorite);
        props.saveFavorite(null);
    }

    useEffect(() => {
        if (props.currentFavorite) {
            getDefaultWeatherOfFavorite();
        } else {
            getDefaultWeatherOfTLV();
        }
    }, [props.currentFavorite])

    const onChangeInput = async (e) => {
        const { value } = e.target;
        setSearchLocationInput(value);
        if (value) {
            const res = await LocationService.getLocationsOptions(value, errorHandler);
            setLocationsOptions(res?.data);
        }
    }

    const onChangeAutoComplete = async (e: any, value: LocationOptionsObj) => {
        setCurrentLocationOption(value);
        await handleGetDaysOfDailyForecasts(value);
    }

    const isFavoriteWeather = () => {
        const currFavoriteWeather = props.favorites.find(f => f.LocalizedName === currentLocationOption?.LocalizedName)
        return !!currFavoriteWeather;
    }

    const handleAddToFavorite = () => {
        if (!isFavoriteWeather()) {
            const newFavorite = {
                id: getRandomArbitrary(1, 999999),
                LocalizedName: currentLocationOption.LocalizedName,
                Key: currentLocationOption.Key,
                Temperature: currentWeather.Temperature,
            }
            props.addFavorite(newFavorite);
        }
    }


    return (
        <Box height="100%">
            <Box className="autocomplete-contain">
                <Autocomplete
                    options={locationsOptions}
                    freeSolo={true}
                    defaultValue={props.currentFavorite ?? defaultLocationOptionTLV}
                    onChange={onChangeAutoComplete}
                    getOptionLabel={(option) => option?.LocalizedName ?? ''}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Add city name" value={searchLocationInput} onChange={onChangeInput} />
                    )}
                />
            </Box>

            {
                daysOfDailyForecasts && (
                    <StyledCard variant="outlined" style={props.isDarkMode ? { backgroundColor: 'gray', color: 'white' } : {}}>
                        <Box className="contain-header-weader-card">
                            <Box display="flex" alignItems="center">
                                {
                                    currentLocationOption &&
                                    <>
                                        <Box mr={2} className="weather-icon-contain"><img src={weatherImg} alt="Weather" style={{width: 80, height: 80}}/></Box>
                                        <Box>
                                            <Box>{currentLocationOption.LocalizedName}</Box>
                                            {
                                                currentWeather &&
                                                <Box>{currentWeather.Temperature.Metric.Value} {currentWeather.Temperature.Metric.Unit}</Box>
                                            }
                                        </Box>
                                    </>
                                }
                            </Box>

                            <Button className="add-favorite-btn"  style={props.isDarkMode ? { color: 'white' } : {}} onClick={handleAddToFavorite}><Favorite htmlColor={isFavoriteWeather() ? "blue" : ""} className="love-icon" />Add to favorite</Button>
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
                    </StyledCard>
                )
            }

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

        </Box>
    )
}

const mapStateToProps = (state) => ({
    favorites: state.favorite.favorites,
    currentFavorite: state.favorite.currentFavorite,
    isDarkMode: state.darkMode.isDarkMode,
});

const mapDispatchToProps = {
    addFavorite,
    saveFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
