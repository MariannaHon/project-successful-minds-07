//import React from 'react';

import //useSelector,

//useDispatch,

'react-redux';

//import { useNavigate } from 'react-router-dom';

//import styled from 'styled-components';

import { WaterСonsumptionTracker } from '../../components/WaterСonsumptionTracker';

import { WhyDrinkWater } from '../../components/WhyDrinkWater';

//import { WhyDrinkWater } from '../../components/WhyDrinkWater';

const WelcomePage = () => {
  //const dispatch = useDispatch();

  //const navigate = useNavigate();

  //   const handleTryTrackerClick = () => {

  //     navigate('/signup');

  //   };

  return (
    <>
      <WaterСonsumptionTracker />

      <WhyDrinkWater />

      {/* <TryTrackerButton onClick={handleTryTrackerClick}>

        Try tracker

      </TryTrackerButton> */}
    </>
  );
};

export default WelcomePage;
