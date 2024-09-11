import {useState, useEffect, useId} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { CiGlass } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './EditModal.module.css';
import { changeWater } from '../../redux/water/operations';
import { selectWaterPerDay } from '../../redux/water/selectors';
import { fetchWaterPerDay } from '../../redux/water/operations';
import { refreshUser } from '../../redux/auth/operations';
import toast, { Toaster } from 'react-hot-toast';
import icons from '../../../public/symbol-defsN.svg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 592,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  const FeedbackSchema = Yup.object().shape({
    value:  Yup.number().min(50).max(999),
  })

  export default function EditModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const userDataWater = useSelector(selectWaterPerDay);
    const userId = userDataWater?._id;
    const fieldId = useId();
    const [amount, setAmount] = useState();
    // edit water panel
    const handleDec = () => {
      setAmount(prev => (prev > 50 ? prev - 50 : 0));
    };
    const handleInc = () => {
      setAmount(amount + 50);
    };
    // ================
    // edit date panels
    const [date, setDate] = useState();
    const formatTimeForInput = date => {
      let hours = new Date(date).getHours();
      let minutes = new Date(date).getMinutes();
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${minutes}`;
    };

    const handleTimeChange = e => {
      const [hours, minutes] = e.target.value.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setDate(newDate);
    };

    const handleAmountChange = e => {
      const value = e.target.value;
      setAmount(value === '' ? '' : Number(value));
    };

    // ===========================================
    useEffect(() => {
        if (open && !userDataWater) {
          dispatch(fetchWaterPerDay(userId));
        } }, [open, dispatch, userId, userDataWater]);

    const handleSubmit = async (values, actions) => {
            try {
              const result = await dispatch(changeWater({   
                localTime: values.time,
                 _id: values.userId, 
                waterValue: values.amount 
              })           
            ).unwrap();
              if (changeWater.fulfilled) {
                actions.resetForm(result);
                setOpen(false);
                dispatch(refreshUser());
              }
            } catch (error) {
              toast.error('Something went wrong :( Try again later.');
              console.error('Failed to update user data:', error);
              actions.setErrors({ submit: error.message });
              setOpen(true);
            }
          };    
        
    return (
      <>
        <Button onClick={handleOpen}><HiOutlinePencilSquare className={css.iconPencil} /></Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <button onClick={handleClose} className={css.iconClose}>
            <IoClose />
          </button>
            <Formik
            initialValues={ {
                localTime: userDataWater?.time,
                _id: userDataWater?.id, 
                waterValue: userDataWater?.amount
              }}
                onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
            enableReinitialize 
            >
            <Form>
              <div className={css.container}>
          
              <p className={css.header}>Edit the entered amount of water</p>
              <div className={css.value}>
              <CiGlass className={css.iconGlass}/>
              <p className={css.amount}>{amount}ml</p>
              <p className={css.time}>18:20</p>
            </div>
            <div className={css.correctBlock}>
              <p className={css.correct}>Correct entered data:</p>              
              <p>Amount of water:</p>              
          <div className={css.amountCalc}>
            <button
              type="button"
              className={css.amountBtnDec}
              onClick={handleDec}
              disabled={amount === 0}
            >
              <svg>
                <use href={`${icons}#icon-minus`}></use>
              </svg>
            </button>
            <p className={css.spanAmount}>{amount ? `${amount} ml` : '0 ml'}</p>
            <button
              type="button"
              className={css.amountBtnInc}
              onClick={handleInc}
              disabled={amount === 5000}
            >
              <svg>
                <use href={`${icons}#icon-plus`}></use>
              </svg>
            </button>
            </div>
            </div>
            <div className={css.inputWrapper}>
            <label htmlFor='time'>Recording time:</label>
            <input
              type="time"
              name="time"
              value={formatTimeForInput(date)}
              onChange={handleTimeChange}
              className={css.inputWrapperWater}
            />
          </div>         
            <div className={css.entered}>
            <label htmlFor="amount" className={css.correct}>Enter the value of the water used:</label>
            <Field   type="number"
            id={`${fieldId}-amount`}
              name="amount"
              min={0}
              max={5000}
              value={amount === '' ? '' : amount}
              onChange={handleAmountChange}
              className={css.inputWrapperWater} />
            <ErrorMessage name="value" component="span" className={css.error} />
            </div></div>
            <div className={css.buttonSpn}>
            <span className={css.spanAmountEnd}>{amount} ml</span>
            <button type="submit" className={css.button}>Save</button>
                  <Toaster position="top-center" reverseOrder={true}/>
              </div>
            </Form>
            </Formik>
          </Box>
        </Modal>
        
      </>
    );
  }