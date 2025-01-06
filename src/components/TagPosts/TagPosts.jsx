import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import { Post } from '../Post/index';
import { TagsBlock } from '../TagsBlock';

export const TagPosts = () => {
  const { tag } = useParams(); 

  const staticPosts = [
    {
      _id: 1,
      title: 'React приложение но сайт',
      imageUrl:
        'https://timeweb.com/media/articles/0001/09/thumb_8079_articles_standart.png',
      user: {
        avatarUrl:
          'https://zastavki.gas-kvas.com/uploads/posts/2024-09/zastavki-gas-kvas-com-mkk8-p-zastavki-smeshnie-na-avatarku-8.jpg',
        fullName: 'Артём',
      },
      createdAt: '2024-09-12',
      viewsCount: 1340,
      commentsCount: 2,
      tags: ['react', 'typescript'],
    },
    {
      _id: 2,
      title: 'Backend или Frontend? Влияние выбора на невыборность',
      imageUrl:
        'https://world.uz/files/1663680956_39-mykaleidoscope-ru-p-banalnii-interes-krasivo-41_454787yz.jpg',
      user: {
        avatarUrl:
          'https://lastfm.freetls.fastly.net/i/u/ar0/db5d0bbd0cbe4031c09df2aa726c5475.png',
        fullName: 'Иван',
      },
      createdAt: '2024-10-27',
      viewsCount: 1092,
      commentsCount: 3,
      tags: ['backend', 'fun', 'frontend'],
    },
  ];

  const staticTags = ['react', 'typescript', 'frontend', 'backend', 'fun']

  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const filtered = staticPosts.filter((post) => post.tags.includes(tag));
    setFilteredPosts(filtered); 
  }, [tag]); 

  return (
    <>
      <h2>Посты с тегом: {tag}</h2>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={post.commentsCount}
                tags={post.tags}
              />
            ))
          ) : (
            <p>Нет постов с этим тегом</p>
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={staticTags} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
