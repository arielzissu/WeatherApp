import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Paper, Tabs, Tab } from '@material-ui/core';
import { Cloud, Favorite } from '@material-ui/icons';
import { Routes } from '../routes/route';

export default function NavBar() {
    const history = useHistory();
    const [currTab, setCurrTab] = useState<number>(0);
    
    const onClickTab = (e, newValue) => {
        setCurrTab(newValue);
        history.push('/');
        history.replace(newValue);
    }

    return (
        <>
            <Paper square>
                <Tabs
                    value={currTab}
                    onChange={onClickTab}
                >
                    <Tab icon={<Cloud />} value={Routes.WEATHER} label="Home" />
                    <Tab icon={<Favorite />} value={Routes.FAVORITE} label="Favorite" />
                </Tabs>
            </Paper>
        </>
    )
}
