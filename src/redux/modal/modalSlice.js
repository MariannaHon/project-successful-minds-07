
import { createSlice } from "@reduxjs/toolkit";

const modalInitialState = {
    openModal: false,
    modalContent: null,

    isModalOpen: false,
    logOutModal: false,
    isDeleteEntry: false,
    AddWater: false,
    idToDelete: "",
    isEditWater: false,
    idToEdit: "",
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

        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.isSettingModalOpen = false;
            state.logOutModal = false;
            state.isDeleteEntry = false;
            state.AddWater = false;
            state.isEditWater = false;
        },
        settingModal: (state) => {
            state.isSettingModalOpen = true;
        },
        logOutModal: (state) => {
            state.logOutModal = true;
        },
        deleteEntry: (state, action) => {
            state.isDeleteEntry = true;
            state.idToDelete = action.payload;
        },
        addWater: (state) => {
            state.AddWater = true;
        },
        editWater: (state, action) => {
            state.isEditWater = true;
            state.idToEdit = action.payload;
        },
    },
});

export const { setModalStatus, setModalContent, openModal,
    closeModal,
    settingModal,
    logOutModal,
    deleteEntry,
    addWater,
    editWater, } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

