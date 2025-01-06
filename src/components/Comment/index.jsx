import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Comment.module.scss";
import axios from '../../axios';
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export const Index = ({ onAddComment }) => {
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.data);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  /* useEffect(() => {
    axios.get(`/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      
      .catch((err) => {
        console.error(err);
        alert("Не удалось загрузить комментарии");
      });
  }, [postId]); */

  const sendComment = async () => {
    try {
      setIsLoading(true);
      
      const fields = { 
        text
      };

      const { data } = await axios.post(`/posts/${postId}`, fields);

      const newComment = {
        ...data, // информация о комментарии
        user: {
          fullName: userData.fullName,
          avatar: userData.avatar
        }
      };

      // Передаем новый комментарий с информацией о пользователе
      if (onAddComment) {
        onAddComment(newComment);
      }

      //setComments((prevComments) => [...prevComments, data]);
      setText('');
    } catch (err) {
      console.error(err);
      alert('Не удалось отправить комментарий');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        src={userData?.avatar ? `http://localhost:4444/${userData.avatar}` : ''}
      />
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {userData ? (
          <Button onClick={sendComment} variant="contained" disabled={isLoading || !text}>
            {isLoading ? "Отправка..." : "Отправить"}
          </Button>
        ) : (
          <Button onClick={handleRegister} variant="contained" color="primary">
            Зарегистрироваться
          </Button>
        )}
      </div>
    </div>
  );
};
