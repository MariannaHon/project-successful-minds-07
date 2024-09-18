import { useState, useEffect, useId } from 'react';
import { useDispatch } from 'react-redux';
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
import { fetchWaterPerDay } from '../../redux/water/operations';
import toast, { Toaster } from 'react-hot-toast';
import icons from '../../../public/symbol-defsN.svg';
import moment from 'moment';

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
  waterValue: Yup.number().min(50, 'Too little! Min 50 ml').max(5000, 'Too much! Max 5000 ml'),
  localTime: Yup.string().required('Time is required'),
});

export default function EditModal({ editedAmount, editedTime, userId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const fieldId = useId();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      dispatch(fetchWaterPerDay(userId));
    }
  }, [open, dispatch, userId]);

  const handleSubmit = async (values, actions) => {
    try {
      const formattedDateTime = formatDateTimeForBackend(
        editedTime,
        values.localTime
      );

      const result = await dispatch(
        changeWater({
          localTime: formattedDateTime,
          _id: userId,
          waterValue: values.waterValue,
        })
      ).unwrap();

      if (changeWater.fulfilled) {
        actions.resetForm(result);
        setOpen(false);
        dispatch(fetchWaterPerDay());
        toast.success('Successfully update water record in the list');
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
      <Button onClick={handleOpen}>
        <HiOutlinePencilSquare className={css.iconPencil} />
      </Button>
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
            initialValues={{
              localTime: formatTimeForInput(editedTime),
              waterValue: editedAmount || 0,
              userId: userId || '',
            }}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
            enableReinitialize
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className={css.container}>
                  <p className={css.header}>Edit the entered amount of water</p>
                  <div className={css.value}>
                    <CiGlass className={css.iconGlass} />
                    <p className={css.amount}>{values.waterValue}ml</p>
                    <p className={css.time}>{formatTimeForInput(editedTime)}</p>
                  </div>
                  <div className={css.correctBlock}>
                    <p className={css.correct}>Correct entered data:</p>
                    <p>Amount of water:</p>
                    <div className={css.amountCalc}>
                      <button
                        type="button"
                        className={css.amountBtnDec}
                        onClick={() =>
                          setFieldValue(
                            'waterValue',
                            values.waterValue > 50 ? values.waterValue - 50 : 0
                          )
                        }
                        disabled={values.waterValue === 0}
                      >
                        <svg>
                          <use href={`${icons}#icon-minus`}></use>
                        </svg>
                      </button>
                      <p className={css.spanAmount}>
                        {values.waterValue ? `${values.waterValue} ml` : '0 ml'}
                      </p>
                      <button
                        type="button"
                        className={css.amountBtnInc}
                        onClick={() =>
                          setFieldValue('waterValue', values.waterValue + 50)
                        }
                        disabled={values.waterValue === 5000}
                      >
                        <svg>
                          <use href={`${icons}#icon-plus`}></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={css.inputWrapper}>
                    <label htmlFor="localTime">Recording time:</label>
                    <Field
                      type="time"
                      name="localTime"
                      className={css.inputWrapperWater}
                    />
                    <ErrorMessage
                      name="localTime"
                      component="span"
                      className={css.error}
                    />
                  </div>
                  <div className={css.entered}>
                    <label htmlFor="waterValue" className={css.correct}>
                      Enter the value of the water used:
                    </label>
                    <Field
                      type="number"
                      id={`${fieldId}-waterValue`}
                      name="waterValue"
                      min={0}
                      max={5000}
                      className={css.inputWrapperWater}
                    />
                    <ErrorMessage
                      name="waterValue"
                      component="span"
                      className={css.error}
                    />
                  </div>
                </div>
                <div className={css.buttonSpn}>
                  <span className={css.spanAmountEnd}>
                    {values.waterValue} ml
                  </span>
                  <button type="submit" className={css.button}>
                    Save
                  </button>
                  <Toaster position="top-center" reverseOrder={true} />
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}


function formatTimeForInput(date) {
  if (!date) return '';

  const localTime = moment.utc(date).local();
  return localTime.format('HH:mm');
}



function formatDateTimeForBackend(isoDateString, time) {

  if (!isoDateString || !time) {
    console.error('Invalid ISO date string or time');
    return '';
  }


  const date = moment(isoDateString);
  const [hours, minutes] = time.split(':');

  date.set({
    hour: hours,
    minute: minutes
  });

  return date.utc().format('YYYY-MM-DD HH:mm');
}
