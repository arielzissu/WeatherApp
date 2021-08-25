import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Tabs, Tab, FormControlLabel, Switch, Box } from '@material-ui/core';
import { Cloud, Favorite } from '@material-ui/icons';
import { Routes } from '../routes/route';
import { updateIsDarkMode } from '../store/actions/darkModeAction';

function NavBar(props: any) {
    const history = useHistory();
    const [currTab, setCurrTab] = useState<number>(0);
    const [isNightMode, setIsNightMode] = useState<boolean>(false);

    const onClickTab = (e, newValue) => {
        setCurrTab(newValue);
        history.push(newValue === 0 ? Routes.WEATHER : Routes.FAVORITE);
    }

    const handleSetIsNightMode = () => {
        setIsNightMode(!isNightMode);
        props.updateIsDarkMode(!isNightMode);
    }

    return (
        <Box display="flex" justifyContent="space-between">
            <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={currTab}
                onChange={onClickTab}
            >
                <Tab icon={<Cloud />} label="Home" />
                <Tab icon={<Favorite />} label="Favorite" />
            </Tabs>

            <FormControlLabel
                control={
                    <Switch
                        checked={isNightMode}
                        onChange={handleSetIsNightMode}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Dark mode"
            />
        </Box>
    )
}

const mapStateToProps = (state) => ({
    isDarkMode: state.darkMode.isDarkMode,
});

const mapDispatchToProps = {
    updateIsDarkMode
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
