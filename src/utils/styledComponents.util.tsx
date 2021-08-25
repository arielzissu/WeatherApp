import styled from 'styled-components';
import { Box, Card } from '@material-ui/core';

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

export const FavoriteCard = styled(WeaderCard)` && {
    position: relative;
    margin-right: 0;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
}`;

export const StyledCard = styled(Card)` && {
    padding: 40px;
    min-height: 60%;
    @media screen and (max-width: 900px) {
        padding: 10px;
    }
}`;