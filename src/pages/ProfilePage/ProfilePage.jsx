import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import {getProfile, updateProfile} from "../../services/profile";
import styles from "./ProfilePage.module.scss";

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setProfile({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          username: userData.username,
          bio: userData.bio,
        });
      } catch (error) {
        console.error("Ошибка:", error.message);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const updatedProfile = await updateProfile(profile);
      setProfile({
        ...profile,
        firstName: updatedProfile.first_name,
        lastName: updatedProfile.last_name,
        bio: updatedProfile.bio,
      });
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      navigate("/");
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error.message);
    }
  };

  return (
    <div className={styles.profilePage}>
      <h2 className={styles.h2}>Профиль</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Имя</label>
        {profile ? (
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                firstName: e.target.value,
              }))
            }
          />
        ) : (
          <Skeleton variant="text" width={270} height={40} />
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Фамилия</label>
        {profile ? (
          <input
            type="text"
            value={profile.lastName}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                lastName: e.target.value,
              }))
            }
          />
        ) : (
          <Skeleton variant="text" width={270} height={40} />
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Биография</label>
        {profile ? (
          <textarea
            value={profile.bio}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                bio: e.target.value,
              }))
            }
          />
        ) : (
          <Skeleton variant="text" width={270} height={40} />
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Имя пользователя</label>
        {profile ? (
          <input
            type="text"
            value={profile.username}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                username: e.target.value,
              }))
            }
          />
        ) : (
          <Skeleton variant="text" width={270} height={40} />
        )}
      </div>

      {profile ? (
        <button className={styles.saveButton} onClick={handleSave}>
          Сохранить
        </button>
      ) : (
        <Skeleton variant="rectangular" width={270} height={42} />
      )}
    </div>
  );
}

export default ProfilePage;
