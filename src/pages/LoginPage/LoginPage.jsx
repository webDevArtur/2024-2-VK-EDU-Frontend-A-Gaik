import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/auth';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.username || !formData.password) {
      setErrors({ general: 'Пожалуйста, заполните оба поля' });
      return;
    }

    login(formData)
      .then((tokens) => {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        navigate('/');
      })
      .catch((error) => {
        setErrors({ general: error.message });
      });
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Авторизация</h2>

        {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}

        <input
          type="text"
          name="username"
          placeholder="Логин"
          value={formData.username}
          onChange={handleChange}
          required
          className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
        />
        {errors.username && <div className={styles.errorMessage}>{errors.username[0]}</div>}

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
        />
        {errors.password && <div className={styles.errorMessage}>{errors.password[0]}</div>}

        <button type="submit" className={styles.submitButton}>
          Войти
        </button>

        <p className={styles.switchText}>
          Нет аккаунта?{' '}
          <Link to="/register" className={styles.switchLink}>
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
