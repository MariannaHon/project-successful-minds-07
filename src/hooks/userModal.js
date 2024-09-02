import { useSelector } from "react-redux";

import {
  selectModalContent,
  selectOpenModal,
} from "../redux/modal/modalSelectors";

export const useModal = () => {
  const modalStatus = useSelector(selectOpenModal);
  const modalContent = useSelector(selectModalContent);

  return {
    modalStatus,
    modalContent,
  };
};
