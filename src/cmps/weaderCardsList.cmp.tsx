import React from 'react';
import dayjs from 'dayjs';
import { Box } from '@material-ui/core';
import { DailyForecastsObj } from '../models/weather.model';
import { WeaderCard } from '../utils/styledComponents.util';


export type Props = {
    daysOfDailyForecasts: DailyForecastsObj[];
};

export default function WeaderCardsList(props: Props) {
    const { daysOfDailyForecasts } = props;

    return (
        <>
            {daysOfDailyForecasts.map((d, idx) => (
                <WeaderCard key={idx}>
                    <Box>{dayjs(d.Date).format('ddd')}</Box>
                    <Box>{d.Temperature.Maximum.Value} {d.Temperature.Maximum.Unit}</Box>
                </WeaderCard>
            ))}
        </>
    )
}
