import { useDispatch } from "react-redux";
import { setModalContent, setModalStatus } from "../redux/modal/modalSlice";

const useCloseModal = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent(null));
  };

  return handleCloseModal;
};

export default useCloseModal;
