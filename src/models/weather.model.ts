export type TemperatureObj = {
    Metric: {
        Value: number,
        Unit: string,
        UnitType: number
    },
    Imperial: {
        Value: number,
        Unit: string,
        UnitType: number
    }
}

export type CurrentWeatherObj = {
    LocalObservationDateTime: string,
    EpochTime: number,
    WeatherText: string,
    WeatherIcon: number,
    HasPrecipitation: boolean,
    PrecipitationType: any,
    IsDayTime: boolean,
    Temperature: TemperatureObj,
    MobileLink: string,
    Link: string,
}

export type LocationOptionsObj = {
    Version: number,
    Key: string,
    Type: string,
    Rank: number,
    LocalizedName: string,
    Country: {
        ID: string,
        LocalizedName: string,
    },
    AdministrativeArea: {
        ID: string,
        LocalizedName: string,
    }
}
export type DailyForecastsObj = {
        Date: string,
        EpochDate: number,
        Temperature: {
            Minimum: {
                Value: number,
                Unit: string,
                UnitType: number,
            },
            Maximum: {
                Value: number,
                Unit: string,
                UnitType: number,
            }
        },
        Day: {
            Icon: number,
            IconPhrase: string,
            HasPrecipitation: boolean,
            PrecipitationType: string,
            PrecipitationIntensity: string,
        },
        Night: {
            Icon: number,
            IconPhrase: string,
            HasPrecipitation: boolean,
            PrecipitationType: string,
            PrecipitationIntensity: string,
        },
        Sources: string[],
        MobileLink: string,
        Link: string,
}

export type DailyForecastsData = {
    Headline: {
        EffectiveDate: string,
        EffectiveEpochDate: number,
        Severity: number,
        Text: string,
        Category: any,
        EndDate: string,
        EndEpochDate: number,
        MobileLink: string,
        Link: string,
    },
    DailyForecasts: DailyForecastsObj[],
}

export const defaultLocationOptionTLV: LocationOptionsObj = {
    "Version": 1,
    "Key": "215854",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
    }
};

export type FavoriteObj = {
    id: number,
    LocalizedName: string,
    Key: string,
    Temperature: TemperatureObj,
}