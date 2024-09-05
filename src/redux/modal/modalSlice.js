
import { createSlice } from "@reduxjs/toolkit";

const modalInitialState = {
    openModal: false,
    modalContent: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState: modalInitialState,
    reducers: {
        setModalStatus: (state, action) => {
            state.openModal = action.payload;
        },
        setModalContent: (state, action) => {
            state.modalContent = action.payload;
        },
    },
});

export const { setModalStatus, setModalContent } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

