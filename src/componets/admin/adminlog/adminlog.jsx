import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './adminlog.module.css';
import { useNavigate, Link } from 'react-router-dom';

export function AdminLog() {
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
        if (!username || !password) {
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
                        <h2 className={styles.header}>Авторизация</h2>
                        
                        <div className={styles.container}>
                            <label className={styles.label}>Имя пользователя</label>
                            <input 
                                type="text" 
                                className={styles.inputStyle} 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Обработчик изменения
                            />
                            
                            <label className={styles.label}>Пароль:</label>
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
                            {passwordError && (
                                <div className={styles.errorMessage}>
                                    {passwordError}
                                </div>
                            )}
                        </div>

                        <div className={styles.paddingbottom}>
                            <Button 
                                variant="contained"
                                color="secondary"
                                className={styles.buttonstart}
                                onClick={handleSubmit}
                            > 
                                Войти в аккаунт
                            </Button>
                        </div>

                        {/* Добавляем фразу с ссылкой */}
                        <div className={styles.createAccountText}>
                            Нет аккаунта? <Link to="/adminreg" className={styles.createAccountLink}>Создайте его!</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
