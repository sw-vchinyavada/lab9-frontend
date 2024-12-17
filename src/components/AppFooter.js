import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import { useNavigate } from 'react-router-dom'


function AppFooter() {
    const navigate = useNavigate();

  return (
    <div className={styles.appHeader}>
      <Button variant="danger" onClick={() =>{
            navigate("/");
      } }>
        Logout
      </Button>
    </div>
  );
}

export default AppFooter;
