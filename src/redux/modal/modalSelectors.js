
export const selectOpenModal = (state) => state.modalInfo.openModal;
export const selectModalContent = (state) => state.modalInfo.modalContent;

// ==========================================

export const selectIsModalOpen = (state) => state.modal?.isModalOpen;
export const selectLogOutModal = (state) => state.modal.logOutModal;
export const selectIsDeleteEntry = (state) =>
    state.modal.isDeleteEntry;
export const selectAddWater = (state) =>
    state.modal.AddWater;

export const selectIdToDelete = (state) => state.modal.idToDelete;
export const selectIsEditWater = (state) =>
    state.modal.isEditWater;
export const selectIdToEdit = (state) => state.modal.idToEdit;