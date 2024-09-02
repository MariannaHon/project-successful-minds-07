import { useState } from "react";

const useModalHandlers = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDayClick = (day) => {
    if (selectedDay === day) {
      setShowModal(!showModal);
    } else {
      setSelectedDay(day);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDay(null);
  };

  return {
    selectedDay,
    showModal,
    handleDayClick,
    handleModalClose,
  };
};

export default useModalHandlers;
