import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatar, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar ? `http://localhost:4444/${avatar}`: "http://localhost:4444/upload/placeholder-image.png"}/>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
}; 
