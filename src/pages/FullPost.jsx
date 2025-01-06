import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/Comment";
import Markdown from 'react-markdown';
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const staticPost = {
    id: 1,
    title: "Backend или Frontend? Влияние выбора на невыборность",
    imageUrl: "https://world.uz/files/1663680956_39-mykaleidoscope-ru-p-banalnii-interes-krasivo-41_454787yz.jpg",
    user: "Иван",
    createdAt: "1.12.2023",
    viewsCount: 1092,
    commentsCount: 2,
    tags: ['backend', 'fun', 'frontend'],
    text: "### Преимущества и недостатки \n\nFrontend привлекает своей визуальностью, а backend стабильностью. Что выберешь ты?",
  };

  const [comments, setComments] = useState([
    {
      _id: "1",
      user: { fullName: "Петр", avatarUrl: "" },
      text: "Интересная статья, спасибо!",
    },
    {
      _id: "2",
      user: { fullName: "Анна", avatarUrl: "" },
      text: "Мне кажется, фронтенд легче начать изучать.",
    },
  ]);

  const { id } = useParams()

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [
      ...prevComments,
      { _id: String(prevComments.length + 1), user: { fullName: "Гость" }, text: newComment },
    ]);
  };

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };

  return (
    <>
      <Post
        id={staticPost.id}
        title={staticPost.title}
        imageUrl={staticPost.imageUrl}
        user={staticPost.user}
        createdAt={staticPost.createdAt}
        viewsCount={staticPost.viewsCount}
        commentsCount={comments.length}
        tags={staticPost.tags}
        isFullPost
      >
        <Markdown children={staticPost.text} />
      </Post>

      <CommentsBlock
        items={comments.map((comment) => ({
          _id: comment._id,
          user: {
            fullName: comment.user.fullName,
            avatarUrl: comment.user.avatarUrl,
          },
          text: comment.text,
          isEditable: false, 
        }))}
        isLoading={false}
        onDeleteComment={handleDeleteComment}
      >
        <Index onAddComment={handleAddComment} />
      </CommentsBlock>
    </>
  );
};
