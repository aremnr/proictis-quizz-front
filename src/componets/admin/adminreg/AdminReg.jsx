import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './adminreg.module.css';
import { useNavigate } from 'react-router-dom';

export function AdminReg() {
    const navigate = useNavigate(); // Хук для навигации
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState(''); // Состояние для имени пользователя
    const [password, setPassword] = useState(''); // Состояние для пароля
    const [referralCode, setReferralCode] = useState(''); // Состояние для реферального кода
    const [passwordError, setPasswordError] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        // Регулярное выражение для проверки ввода только английских букв и цифр
        const regex = /^[a-zA-Z0-9]*$/;

        if (regex.test(newPassword) || newPassword === '') {
            setPassword(newPassword);
            setPasswordError(''); // Сбросить ошибку при корректном вводе
        } else {
            setPasswordError('Пароль должен содержать только английские буквы и цифры.');
        }
    };

    const handleSubmit = () => {
        // Проверка, что все поля заполнены
        if (!username || !password || !referralCode) {
            alert('Пожалуйста, заполните все поля.'); // Выводим предупреждение
            return;
        }

        // Если все поля заполнены, переводим на другую страницу
        navigate('/Welcome'); // Замените '/next-page' на путь, куда хотите перейти
    };

    return (
        <div>
            <div className={styles.bg}>
                <div className={styles.OuterContainer}>
                    <div className={styles.InnerContainer}>
                        <h2 className={styles.header}>Регистрация</h2>
                        <div className={styles.paddingtop}>
                            <label className={styles.label}>Имя пользователя</label>
                            <input 
                                type="text" 
                                className={styles.inputStyle} 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Обработчик изменения
                            />
                            
                            <label className={styles.label}>Придумайте пароль:</label>
                            <div className={styles.passwordContainer}>
                                <input 
                                    type={passwordShown ? "text" : "password"} 
                                    className={styles.inputStyle} 
                                    value={password}
                                    onChange={handlePasswordChange} // Обработчик изменения пароля
                                />
                                <span 
                                    className={styles.eyeIcon} 
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordShown ? (
                                        <i className="fas fa-eye-slash"></i>
                                    ) : (
                                        <i className="fas fa-eye"></i>
                                    )}
                                </span>
                            </div>
                            {passwordError && ( // Условное отображение сообщения об ошибке
                                <div className={styles.errorMessage}>
                                    {passwordError}
                                </div>
                            )}
                            
                            <label className={styles.label}>Реферальный код</label>
                            <input 
                                type="text" 
                                className={styles.inputStyle} 
                                value={referralCode}
                                onChange={(e) => setReferralCode(e.target.value)} // Обработчик изменения
                            />
                            
                            <div className={styles.paddingbottom}>
                                <Button 
                                    variant="contained"
                                    color="secondary"
                                    className={styles.buttonstart}
                                    onClick={handleSubmit} // Обработчик клика по кнопке
                                > 
                                    Создать аккаунт
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
