// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUser } from '../../redux/auth/selectors';
// import css from './DailyNormaModal.module.css';
// import { updatDailiNormaUser } from '../../redux/authUser/operations.js';
// import toast from 'react-hot-toast';
// import { setModalStatus } from '../../redux/modal/modalSlice.js';

// const schema = yup.object().shape({
//     weight: yup.number().typeError('Please, enter a number').min(0).max(300),
//     dailyTimeActivity: yup.number().typeError('Please, enter a number').min(0).max(8),
//     dailyNorma: yup.number().typeError('Please, enter a number').min(0).max(10),
// });

// const DailyNormaModal = () => {
//     const { gender, weight, dailyTimeActivity, dailyNorma } = useSelector(selectUser);
//     const dispatch = useDispatch();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         watch,
//         setValue,
//         getValues,
//     } = useForm({
//         defaultValues: { weight, dailyTimeActivity, dailyNorma },
//         resolver: yupResolver(schema),
//         mode: 'onSubmit',
//     });

//     const userGender = watch('gender');
//     const userWeight = watch('weight');
//     const userSportTime = watch('dailyTimeActivity');

//     const roundUpToTwoDecimalPlaces = (num) => Math.ceil(num * 100) / 100;

//     const calculateNormaWater = (userGender, userWeight, userSportTime) => {
//         let normaWater = 0;
//         if (userWeight >= 0 && userSportTime >= 0) {
//             if (userGender === 'female') {
//                 normaWater = roundUpToTwoDecimalPlaces(userWeight * 0.03 + userSportTime * 0.4);
//             } else if (userGender === 'male') {
//                 normaWater = roundUpToTwoDecimalPlaces(userWeight * 0.04 + userSportTime * 0.6);
//             }
//             setValue('dailyNorma', normaWater);
//             return normaWater;
//         }
//         return normaWater;
//     };

//     const normaWater = calculateNormaWater(userGender, userWeight, userSportTime);

//     const onSubmit = async (data) => {
//         const formData = new FormData();
//         Object.keys(data).forEach((key) => formData.append(key, data[key]));

//         console.log('FormData to be sent:', data);

//         try {
//             await dispatch(updatDailiNormaUser(formData)).unwrap();
//             dispatch(setModalStatus(false));
//             toast.success('The changes were successfully applied!');
//         } catch (error) {
//             console.error('Update failed:', error);
//             toast.error('Failed to apply changes!');
//         }
//     };

//     return (
//         <div className={css.modalContainer}>
//             <h3 className={css.title}>My daily norma</h3>
//             <div className={css.formulaContainer}>
//                 <div>
//                     <h4 className={css.formulaTitle}>For girl:</h4>
//                     <p className={css.formula}>V=(M*0.03) + (T*0.4)</p>
//                 </div>
//                 <div>
//                     <h4 className={css.formulaTitle}>For man:</h4>
//                     <p className={css.formula}>V=(M*0.04) + (T*0.6)</p>
//                 </div>
//             </div>
//             <p className={css.explanation}>
//                 * V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
//             </p>
//             <div className={css.genderContainer}>
//                 <p className={css.calculateRateText}>Calculate your rate:</p>
//                 <label className={css.radioLabel}>
//                     <input
//                         type="radio"
//                         value="female"
//                         name="gender"
//                         checked={userGender === 'female'}
//                         {...register('gender')}
//                     />
//                     For woman
//                 </label>
//                 <label className={css.radioLabel}>
//                     <input
//                         type="radio"
//                         value="male"
//                         name="gender"
//                         checked={userGender === 'male'}
//                         {...register('gender')}
//                     />
//                     For man
//                 </label>
//             </div>
//             <label className={css.label}>
//                 Your weight in kilograms:
//                 <input
//                     type="number"
//                     step="any"
//                     name="weight"
//                     {...register('weight')}
//                     className={`${css.inputField} ${errors.weight && css.error}`}
//                 />
//                 {errors.weight && (
//                     <p className={`${css.errorText}`}>{errors.weight.message}</p>
//                 )}
//             </label>
//             <label className={css.label}>
//                 The time of active participation in sports or other activities with a high physical load in hours:
//                 <input
//                     type="number"
//                     step="any"
//                     name="dailyTimeActivity"
//                     {...register('dailyTimeActivity')}
//                     className={`${css.inputField} ${errors.dailyTimeActivity && css.error}`}
//                 />
//                 {errors.dailyTimeActivity && (
//                     <p className={`${css.errorText}`}>{errors.dailyTimeActivity.message}</p>
//                 )}
//             </label>
//             <div className={css.resultContainer}>
//                 <p className={css.resultText}>The required amount of water in liters per day:</p>
//                 <span className={css.resultValue}>{normaWater ? normaWater : getValues('dailyNorma')} L</span>
//             </div>
//             <label className={css.label}>
//                 Write down how much water you will drink:
//                 <input
//                     type="number"
//                     step="any"
//                     name="dailyNorma"
//                     {...register('dailyNorma')}
//                     className={`${css.inputField} ${errors.dailyNorma && css.error}`}
//                 />
//                 {errors.dailyNorma && (
//                     <p className={`${css.errorText}`}>{errors.dailyNorma.message}</p>
//                 )}
//             </label>
//             <button type="submit" className={css.saveButton} onClick={handleSubmit(onSubmit)}>Save</button>
//         </div>
//     );
// };

// export default DailyNormaModal;
