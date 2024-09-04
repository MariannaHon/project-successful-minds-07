// import { useSelector, useDispatch } from 'react-redux';
// import css from './DailyNorma.module.css';
// import { selectUser } from '../../redux/auth/selectors';
// import { setModalStatus, setModalContent } from '../../redux/modal/modalSlice'; // Імпортуйте редуктори
// import { updatDailiNormaUser } from '../../redux/authUser/operations.js';

// // import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';

// export default function DailyNorma() {
//     const user = useSelector(selectUser);
//     const dispatch = useDispatch();

//     // Встановлюємо денну норму води, яка є в користувача, або 2 літри за замовчуванням
//     const waterDailyNorma = (user && user.dailyNorma ? user.dailyNorma : 2.0).toFixed(1);

//     const handleEditClick = () => {
//         dispatch(setModalContent('DailyNormaModal')); // Встановлюємо контент модалки
//         dispatch(setModalStatus(true)); // Відкриваємо модалку
//     };

//     const handleModalClose = () => {
//         dispatch(setModalStatus(false)); // Закриваємо модалку
//     };

//     const handleSave = (newNorma) => {
//         dispatch(updatDailiNormaUser(newNorma)); // Оновлюємо значення в Redux store
//         handleModalClose(); // Закриваємо модалку після збереження
//     };

//     return (
//         <div className={css.container}>
//             <p className={css.norma}>{waterDailyNorma}L</p>
//             <p className={css.text}>My daily norma</p>
//             <button className={css.editButton} onClick={handleEditClick}>
//                 Edit
//             </button>
//             {/* {useSelector((state) => state.modal.openModal) && (
//                 <DailyNormaModal
//                     onClose={handleModalClose}
//                     onSave={handleSave}
//                     initialNorma={parseFloat(waterDailyNorma)}
//                 />
//             )} */}
//         </div>
//     );
// }
