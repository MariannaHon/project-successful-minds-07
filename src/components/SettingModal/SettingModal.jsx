import { useState, useEffect, useId } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LuUpload } from 'react-icons/lu';
import { IoSettingsOutline, IoClose } from 'react-icons/io5';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { changeAvatar, fetchUser, updateUser } from '../../redux/user/operations';

import { selectUser } from '../../redux/auth/selectors';
import toast, { Toaster } from 'react-hot-toast';

import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './SettingModal.module.css';
import { refreshUser } from '../../redux/auth/operations';

const FeedbackSchema = Yup.object().shape({
  gender: Yup.string().oneOf(['male', 'female'])
    .defined(),
  name: Yup.string().min(3, 'Too Short!').max(34, 'Too Long!'),
  email: Yup.string().email().required('Required'),
  outPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(64, 'Too Long!'),
  nPassword: Yup.string().min(8, 'Too Short!').max(64, 'Too Long!'),
  repeatNPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(64, 'Too Long!')
    .oneOf([Yup.ref('nPassword'), null], 'Passwords must match'),

});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1008,
  margin: 0,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function SettingModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('password');
  const [openPsw, setOpenPsw] = useState(true);
  const fieldId = useId();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const userId = userData?._id;

  useEffect(() => {
    if (open && !userData) {
      dispatch(fetchUser(userId));
    }
  }, [open, dispatch, userId, userData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = async (values, actions) => {
    try {
      const payload = {
        gender: selectedGender,
        name: values.name,
        email: values.email,
      };

      if (values.outPassword && values.nPassword) {
        payload.oldPassword = values.outPassword;
        payload.password = values.nPassword;
      }

      const result = await dispatch(updateUser(payload)).unwrap();

      if (updateUser.fulfilled) {
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

  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setOpenPsw(false);
    } else {
      setType('password');
      setOpenPsw(true);
    }
  };

  const [selectedGender, setSelectedGender] = useState();
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };


  const [selectedFile, setSelectedFile] = useState(null);
  function changeHandler(e) {
    const file = e.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append('avatarUrl', file);
    dispatch(changeAvatar(formData));
  }
  return (
    <div>
      <button className={css.buttonSetting} onClick={handleOpen}>
        <IoSettingsOutline /> Setting
      </button>
      <Modal open={open} onClose={handleClose} className={css.modalWindow}>
        <Box sx={style}>
          <button onClick={handleClose} className={css.iconClose}>
            <IoClose />
          </button>
          <div className={css.container}>
            <Formik
              initialValues={{
                gender: userData?.gender || '',
                name: userData?.name || '',
                email: userData?.email || '',
                outPassword: userData?.password || '',
                nPassword: '',
                repeatNPassword: '',
              }}
              onSubmit={handleSubmit}
              validationSchema={FeedbackSchema}
              enableReinitialize
            >
              <Form>
                <div className={css.leftRightGroup}>
                  <div className={css.groupLeft}>
                    <h1>Setting</h1>
                    <div className={css.changePhoto}>
                      <h3 className={css.groupLeft}>Your Photo</h3>
                      <div className={css.changeAvatar}>
                        <img
                          src={selectedFile ? (URL.createObjectURL(selectedFile)) :
                            (userData?.avatarUrl ||
                              'public/images/setting/Avatar.jpg')
                          }
                          alt="Avatar"
                          className={css.photo}
                        />
                        <label htmlFor={`${fieldId}-avatar`} className={css.link} >
                          <LuUpload className={css.iconChange} />Upload a photo</label>
                        <input type='file' className={css.change} onChange={e => changeHandler(e)}
                          id={`${fieldId}-avatar`} accept="image/*" name="file" />
                      </div>
                    </div>
                    <FormControl className={css.radio}>
                      <FormLabel id="gender-radio-group-label">
                        <h3>Your gender identity</h3>
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="gender-radio-group-label"
                        name="gender"
                        value={selectedGender || userData?.gender}
                        onChange={handleGenderChange}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Woman"
                          className={css.label}
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Man"
                          className={css.label}
                        />
                      </RadioGroup>
                    </FormControl>
                    <div className={css.groupLeft}>
                      <label htmlFor={`${fieldId}-name`}>
                        <h3>Your name</h3>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        id={`${fieldId}-name`}
                        className={css.field} />
                      <ErrorMessage name="name" component="span" className={css.error} />
                    </div>
                    <div className={css.groupLeft}>
                      <label htmlFor={`${fieldId}-email`}>
                        <h3>E-mail</h3>
                      </label>
                      <Field
                        type="text"
                        name="email"
                        id={`${fieldId}-email`}
                        className={css.field}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className={css.error}
                      />
                    </div>
                  </div>
                  <div className={css.groupRight}>
                    <h3>Password</h3>
                    <div className={css.thumb}>
                      <label
                        htmlFor={`${fieldId}-outPassword`}
                        className={css.label}
                      >
                        Outdated password:
                      </label>
                      <Field
                        type={type}
                        name="outPassword"
                        id={`${fieldId}-outPassword`}
                        className={css.field}
                      />
                      <span>
                        {openPsw ? (
                          <FaRegEyeSlash
                            name="outPassword"
                            id={`${fieldId}-outPassword`}
                            className={css.eye}
                            onClick={togglePassInput}
                          />
                        ) : (
                          <FaRegEye
                            name="outPassword"
                            id={`${fieldId}-outPassword`}
                            className={css.eye}
                            onClick={togglePassInput}
                          />
                        )}
                      </span>
                    </div>
                    <ErrorMessage
                      name="outPassword"
                      component="span"
                      className={css.error}
                    />
                    <div className={css.thumb}>
                      <label
                        htmlFor={`${fieldId}-nPassword`}
                        className={css.label}
                      >
                        New Password:
                      </label>
                      <Field
                        type={type}
                        name="nPassword"
                        id={`${fieldId}-nPassword`}
                        className={css.field}
                      />
                      <span>
                        {openPsw ? (
                          <FaRegEyeSlash
                            name="nPassword"
                            id={`${fieldId}-nPassword`}
                            className={css.eye}
                            onClick={togglePassInput}
                          />
                        ) : (
                          <FaRegEye
                            name="nPassword"
                            id={`${fieldId}-nPassword`}
                            className={css.eye}
                            onClick={togglePassInput}
                          />
                        )}
                      </span>
                    </div>
                    <ErrorMessage
                      name="nPassword"
                      component="span"
                      className={css.error}
                    />
                    <div className={css.thumb}>
                      <label
                        htmlFor={`${fieldId}-repeatNPassword`}
                        className={css.label}
                      >
                        Repeat new password:
                      </label>
                      <Field
                        type={type}
                        name="repeatNPassword"
                        id={`${fieldId}-repeatNPassword`}
                        className={css.field}
                      />
                      <span>
                        {openPsw ? (
                          <FaRegEyeSlash
                            name="repeatNPassword"
                            id={`${fieldId}-repeatNPassword`}
                            className={css.eye}
                            onClick={togglePassInput}
                          />
                        ) : (
                          <FaRegEye
                            name="repeatNPassword"
                            id={`${fieldId}-repeatNPassword`}
                            className={css.eye}
                            onClick={togglePassInput}
                          />
                        )}
                      </span>
                    </div>
                    <ErrorMessage
                      name="repeatNPassword"
                      component="span"
                      className={css.error}
                    />
                  </div>
                </div>
                <div className={css.rightBox}>
                  <button type="submit" className={css.button}>
                    Save
                  </button>
                  <Toaster position="top-center" reverseOrder={true} />
                </div>
              </Form>
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default SettingModal;
