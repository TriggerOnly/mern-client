import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'; 
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { logout } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data); 

  const onClickLogout = () => {
    if (window.confirm('Вы хотите выйти из аккаунта?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      window.location.reload()
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MY Habr</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                  <Link to="/profile"> 
                    <Avatar
                      alt="User Avatar"
                      src={`http://localhost:4444/${userData?.avatar}` || ''} 
                      sx={{ width: 40, height: 40 }} 
                    />
                  </Link>
                  <Link to="/add-post">
                    <Button variant="contained">Написать статью</Button>
                  </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
