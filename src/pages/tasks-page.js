import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from '../components/AppContent';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import PageTitle from '../components/PageTitle';
import styles from '../styles/modules/app.module.scss';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';

function TasksPage(props) {
  const { loggedIn, username } = props;
  const navigate = useNavigate();

  console.log(username);
  if(!loggedIn){
    navigate("/login");
  }
  return (
    <>
      <div className="container">
      <img src={logo} className={styles.centerImage} alt="logo" />
        <PageTitle>To-Do List (ISE 7106 LAB-9)</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default TasksPage;
