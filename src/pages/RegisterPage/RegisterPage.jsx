import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { Link } from "react-router-dom";
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <div className={styles.registerPage}>
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <h2 className={styles.title}>Регистрация</h2>

        <input
          type="text"
          name="username"
          placeholder="Логин"
          value={formData.username}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="first_name"
          placeholder="Имя"
          value={formData.first_name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Фамилия"
          value={formData.last_name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <textarea
          name="bio"
          placeholder="Информация о пользователе"
          value={formData.bio}
          onChange={handleChange}
          className={styles.textarea}
        />
        <input
          type="file"
          name="avatar"
          required
          onChange={handleFileChange}
          className={styles.inputFile}
        />

        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>

        <p className={styles.switchText}>
          Уже есть аккаунт? <Link to="/login" className={styles.switchLink}>Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
