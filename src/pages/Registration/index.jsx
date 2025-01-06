import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import AvatarEdit from 'react-avatar-edit';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const [originalFileName, setOriginalFileName] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      let avatarUrl = null;
  
      if (avatar) {
        const formData = new FormData();
        
        const uniqueFileName = originalFileName
          ? originalFileName.split('.').slice(0, -1).join('.') + '.jpeg'
          : 'avatar.jpeg'; 
        
        formData.append("image", avatar, uniqueFileName); 
  
        const { data } = await axios.post(`/upload`, formData);
  
        if (data && data.url) {
          avatarUrl = data.url;
        } else {
          return alert("Ошибка при загрузке аватара");
        }
      } else {
        avatarUrl = '/upload/placeholder-image.png';
      }
  
      const userData = { ...values, avatar: avatarUrl };
  
      const response = await dispatch(fetchRegister(userData));
  
      if (!response.payload) {
        return alert("Не удалось зарегистрироваться");
      }
  
      if ("token" in response.payload) {
        window.localStorage.setItem("token", response.payload.token);
      }
    } catch (error) {
      console.warn(error);
      alert("Ошибка при регистрации");
    }
  };

  const onClose = () => {
    setPreview(null);
    setAvatar(null);
    setOriginalFileName(null); 
  };

  const onCrop = (preview) => {
    setPreview(preview);

    const avatarFile = base64ToFile(preview, originalFileName || "avatar.jpeg");
    setAvatar(avatarFile);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files && elem.target.files[0]) {
      const originalFile = elem.target.files[0];
      setOriginalFileName(originalFile.name); 
    }
  };

  const base64ToFile = (base64, originalFileName) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const uniqueFileName = originalFileName
      ? originalFileName.split('.').slice(0, -1).join('.') + '.jpeg'
      : 'avatar.jpeg';
    return new File([blob], uniqueFileName, { type: mimeString });
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <div className={styles.avatar}>
        <AvatarEdit
          width={120}
          height={120}
          onClose={onClose}
          onCrop={onCrop}
          onBeforeFileLoad={onBeforeFileLoad} 
          label="Выберите фото"
        />
        {preview && (
          <Avatar
            src={preview}
            alt="Avatar Preview"
            sx={{ width: 100, height: 100 }}
          />
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите имя" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
