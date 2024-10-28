import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import UpdateAvatarModal from "../../components/UpdateAvatarModal/UpdateAvatarModal";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    avatar: "/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png",
    firstName: "Иван",
    lastName: "Иванов",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleAvatarUpdate = (newAvatar) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      avatar: newAvatar,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    navigate("/");
  };

  return (
    <div className={styles.profilePage}>
      <h2 className={styles.h2}>Профиль</h2>

      <div className={styles.avatarWrapper}>
        <img src={profile.avatar} alt="Аватар" className={styles.avatar} />

        <span
          className={styles.editIcon}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <AddPhotoAlternateIcon />
        </span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Имя</label>

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
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Фамилия</label>

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
      </div>

      <button className={styles.saveButton} onClick={handleSave}>
        Сохранить
      </button>

      {isModalOpen && (
        <UpdateAvatarModal
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleAvatarUpdate}
        />
      )}
    </div>
  );
}

export default ProfilePage;
