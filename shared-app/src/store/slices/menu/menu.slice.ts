import { createSlice } from '@reduxjs/toolkit'
import { IMenuState } from './menu.interface'

const initialState = {
    allowedRoutesGestor: []
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setAllowedRoutesGestor: (state: IMenuState, action) => {
            state.allowedRoutesGestor = action.payload;
        },
        cleanAllowedRoutesGestor: (state: IMenuState) => {
            state.allowedRoutesGestor = [];
        }
    }
});

export const { setAllowedRoutesGestor, cleanAllowedRoutesGestor } = menuSlice.actions