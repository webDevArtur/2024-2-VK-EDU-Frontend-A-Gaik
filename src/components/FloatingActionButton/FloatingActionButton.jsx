import React from "react";
import styles from "./FloatingActionButton.module.scss";
import EditIcon from "@mui/icons-material/Edit";

const FloatingActionButton = ({ onClick }) => {
  return (
    <button className={styles.fab} onClick={onClick}>
      <EditIcon />
    </button>
  );
};

export default FloatingActionButton;
