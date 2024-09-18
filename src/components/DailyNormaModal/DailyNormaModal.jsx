import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { updateUser } from '../../redux/user/operations';
import toast from 'react-hot-toast';
import { useState, useEffect, useCallback } from 'react';
import css from './DailyNormaModal.module.css';
import { IoClose } from 'react-icons/io5';

const schema = yup.object().shape({
    weight: yup
        .mixed()
        .test('is-number-or-empty', 'Weight must be a number or an empty string', (value) => {
            return value === '' || (!isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 300);
        }),
    dailyTimeActivity: yup
        .mixed()
        .test('is-number-or-empty', 'Activity time must be a number or an empty string', (value) => {
            return value === '' || (!isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 10);
        }),
    todayWater: yup
        .number()
        .typeError('Please, enter a number')
        .min(0)
        .max(10)
        .required('Daily water intake is required'),
});


const DailyNormaModal = ({ onClose, onUpdateSuccess }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [finalWaterNorm, setFinalWaterNorm] = useState('2.0');
    const [manualWaterNorm, setManualWaterNorm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const formatNumber = (num) => {
        if (isNaN(num)) return '';
        return num.toFixed(1);
    };

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch, getValues } = useForm({
        defaultValues: { weight: '', dailyTimeActivity: '', todayWater: '', gender: '' },
        resolver: yupResolver(schema),
    });

    const watchFields = watch(['weight', 'dailyTimeActivity', 'gender']);

    const calculateNormaWater = (userGender, userWeight, userSportTime) => {
        let normaWater = 2;
        if (userWeight > 0 && userSportTime >= 0) {
            if (userGender === 'female') {
                normaWater = Math.ceil((userWeight * 0.03 + userSportTime * 0.4) * 100) / 100;
            } else if (userGender === 'male') {
                normaWater = Math.ceil((userWeight * 0.04 + userSportTime * 0.6) * 100) / 100;
            }
        }
        return normaWater;
    };

    useEffect(() => {
        if (user) {
            const initialWaterNorm = user.waterRate ? formatNumber(user.waterRate / 1000) : '2.0';
            setFinalWaterNorm(initialWaterNorm);
            setManualWaterNorm(initialWaterNorm);
            reset({
                weight: user.weight || '',
                dailyTimeActivity: user.dailyTimeActivity || '',
                todayWater: user.waterRate ? user.waterRate / 1000 : '',
                gender: user.gender || ''
            });
        }
    }, [user, reset]);

    useEffect(() => {
        if (watchFields[0] && watchFields[1] && !isEditing) {
            const calculatedNormaWater = calculateNormaWater(watchFields[2], watchFields[0], watchFields[1]);
            const formattedValue = formatNumber(calculatedNormaWater);
            setManualWaterNorm(formattedValue);
            setFinalWaterNorm(formattedValue);
            setValue('todayWater', parseFloat(formattedValue));
        }
    }, [watchFields, setValue, isEditing]);

    const onSubmit = async () => {
        const { gender: newGender, todayWater: newTodayWater } = getValues();
        const todayWaterInMilliliters = parseFloat(newTodayWater) * 1000 || 0;

        try {
            const updateUserPayload = {
                gender: newGender,
                waterRate: todayWaterInMilliliters,
            };

            await dispatch(updateUser(updateUserPayload)).unwrap();

            toast.success('The changes were successfully applied!');
            onUpdateSuccess(todayWaterInMilliliters);
            onClose();
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to apply changes!', {
                duration: 5000,
            });
        }
    };

    const handleNumericInput = (e) => {
        const invalidChars = ['-', '+', 'e', 'E'];
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <Modal open={true} onClose={onClose} aria-labelledby="modal-title">
            <Box className={css.modalStyle}>
                <div className={css.modalContainer}>
                    <div className={css.dailyCloseContainer}>
                        <h3 className={css.title}>My daily norma</h3>
                        <button onClick={onClose} className={css.iconClose}>
                            <IoClose />
                        </button>
                    </div>

                    <div className={css.formulaContainer}>
                        <div className={css.formulaTitleContainer}>
                            <h4 className={css.formulaTitle}>For girl: </h4>
                            <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
                        </div>
                        <div className={css.formulaTitleContainer}>
                            <h4 className={css.formulaTitle}>For man: </h4>
                            <p className={css.formula}>V=(M*0.04) + (T*0.6)</p>
                        </div>
                    </div>

                    <div className={css.containerFormulaDescription}>
                        <p className={css.formulaDescription}>
                            <span>*</span> V is the volume of the water norm in liters per day,
                            M is your body weight, T is the time of active sports, or another type
                            of activity commensurate in terms of loads (in the absence of these, you must set 0)
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={css.formContainer}>
                            <h2 className={css.formTitle}>Calculate your rate:</h2>
                            <div className={css.genderContainer}>
                                <label className={css.radioLabel}>
                                    <input
                                        className={css.radio}
                                        type="radio"
                                        value="female"
                                        {...register('gender')}
                                    />
                                    <span className={css.checkmark}></span>
                                    For woman
                                </label>
                                <label className={css.radioLabel}>
                                    <input
                                        className={css.radio}
                                        type="radio"
                                        value="male"
                                        {...register('gender')}
                                    />
                                    <span className={css.checkmark}></span>
                                    For man
                                </label>
                            </div>

                            <label className={css.label}>
                                Your weight in kilograms:
                                <input
                                    placeholder='0'
                                    type="number"
                                    step="any"
                                    {...register('weight')}
                                    className={`${css.inputField} ${errors.weight ? css.error : ''}`}
                                    onKeyDown={handleNumericInput}
                                />
                                {errors.weight && <p className={css.errorText}>{errors.weight.message}</p>}
                            </label>

                            <label className={css.label}>
                                The time of active participation in sports or other activities with a high physical. load in hours:
                                <input
                                    placeholder='0'
                                    type="number"
                                    step="any"
                                    {...register('dailyTimeActivity')}
                                    className={`${css.inputField} ${errors.dailyTimeActivity ? css.error : ''}`}
                                    onKeyDown={handleNumericInput}
                                />
                                {errors.dailyTimeActivity && <p className={css.errorText}>{errors.dailyTimeActivity.message}</p>}
                            </label>

                            <div className={css.resultContainer}>
                                <p className={css.resultText}>The required amount of water in liters per day: </p>
                                <span className={css.resultValue}>{finalWaterNorm || '2.0'} L</span>
                            </div>

                            <label className={css.labelNorma}>
                                Write down how much water you will drink:
                                <input
                                    placeholder='0'
                                    type="number"
                                    step="any"
                                    value={manualWaterNorm}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*\.?\d*$/.test(value)) {
                                            const parsedValue = parseFloat(value) || '';
                                            setManualWaterNorm(parsedValue);
                                            setIsEditing(true);
                                            setValue('todayWater', parsedValue);
                                        }
                                    }}
                                    className={`${css.inputField} ${errors.todayWater ? css.error : ''}`}
                                    onKeyDown={handleNumericInput}
                                />
                                {errors.todayWater && <p className={css.errorText}>{errors.todayWater.message}</p>}
                            </label>
                        </div>
                        <div className={css.containerButton}>
                            <button type="submit" className={css.saveButton}>Save</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default DailyNormaModal;
