import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';import { useId } from "react";
import { LuUpload } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from "yup";

// import { useDispatch } from "react-redux";
import css from "./SettingModal.module.css";
// import {updateUser} from "../../redux/auth/operations";

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!"),
    email:  Yup.string().email(),
    outPassword: Yup.string().min(8, "Too Short!").max(16, "Too Long!"),
    nPassword: Yup.string().min(8, "Too Short!").max(16, "Too Long!"),
    repeatNPassword: Yup.string().min(8, "Too Short!").max(16, "Too Long!")
    .oneOf([Yup.ref("nPassword"), null], "Passwords must match"),
   
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1008,
    bgcolor: 'background.paper',
    border: 'none',
   borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  function SettingModal () {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const dispatch = useDispatch();
    const fieldId = useId();
    const handleSubmit = (values, actions) => {   
    //   dispatch(updateUser(values))          
        actions.resetForm();
      };

    
      return (
       <div>
        <button className={css.buttonSetting} onClick={handleOpen} ><IoSettingsOutline/>  Setting</button>
        <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className={css.container}>
        <button onClick={handleClose} className={css.iconClose}><IoClose /></button>

        <div className={css.container}>
<Formik initialValues={{ picked: "", name: "", email: "", outPassword:"", nPassword:""}} onSubmit={handleSubmit} 
validationSchema={FeedbackSchema} > 
    <Form>
      <div className={css.leftRightGroup}>
      <div className={css.groupLeft}>
        <h1>Setting</h1>
        <div className={css.changePhoto}>
          <h3 className={css.groupLeft}>Your Photo</h3> 
          <div className={css.changeAvatar}> 
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LrzjXCroigKL69FDfQ6enaiHlrDGLiZMUw&s" alt="Avatar" className={css.photo}/>
            <a href="" className={css.link}><LuUpload /> Upload a photo</a>    
          </div>
          </div>   
<FormControl className={css.radio}>
      <FormLabel id="demo-row-radio-buttons-group-label"><h3>Your gender identity</h3></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="women" control={<Radio />} label="Woman" className={css.label} />
        <FormControlLabel value="man" control={<Radio />} label="Man"  className={css.label}/>
     
      </RadioGroup>
    </FormControl>
          <div className={css.groupLeft}>
            <label  htmlFor={`${fieldId}-name`}><h3>Your name</h3></label>
            <Field type="text" name="name" id={`${fieldId}-name`}  className={css.field}/>
            <ErrorMessage name="name" component="span" className={css.error}/>
        </div>
        <div className={css.groupLeft}>
            <label  htmlFor={`${fieldId}-email`}><h3>E-mail</h3></label>
            <Field type="text" name="email" id={`${fieldId}-email`}  className={css.field}/>
            <ErrorMessage name="email" component="span" className={css.error}/>
        </div></div>
        <div className={css.groupRight}>
            
            <h3>Password</h3>
            <label  htmlFor={`${fieldId}-outPassword`} className={css.label}>Outdated password:</label>
            <Field type="password" name="outPassword" id={`${fieldId}-outPassword`}  className={css.field} />
            <ErrorMessage name="outPassword" component="span" className={css.error}/>

            <label  htmlFor={`${fieldId}-nPassword`} className={css.label} >New Password:</label>
            <Field type="password" name="nPassword" id={`${fieldId}-nPassword`}  className={css.field}/>
            <ErrorMessage name="nPassword" component="span" className={css.error}/>

            <label  htmlFor={`${fieldId}-repeatNPassword`} className={css.label} >Repeat new password:</label>
            <Field type="password" name="repeatNPassword" id={`${fieldId}-repeatNPassword`}  className={css.field}/>
            <ErrorMessage name="repeatNPassword" component="span" className={css.error}/>

        </div>
        </div><div className={css.rightBox}>
        <button type="submit" className={css.button}>Save</button></div>
    </Form>

</Formik>
</div>
</Box>
</Modal>
</div>
      )
  }
  export default SettingModal;

