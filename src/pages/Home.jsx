import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { Snackbar, Alert } from '@mui/material';

export const Home = () => {
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

  const staticTags = ['react', 'typescript', 'frontend', 'backend', 'fun'];

  const [filter, setFilter] = useState('new'); 
  const [posts] = useState(staticPosts);

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false); 
  };

  const handleChangeFilter = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredPosts = [...posts].sort((a, b) => {
    if (filter === 'new') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (filter === 'popular') {
      return b.viewsCount - a.viewsCount; 
    }
    return 0;
  });

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={filter}
        onChange={handleChangeFilter}
        aria-label="filter tabs"
      >
        <Tab label="Новые" value="new" />
        <Tab label="Популярные" value="popular" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {filteredPosts.map((post) => (
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
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={staticTags} isLoading={false} />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{ width: '30%' }}
        >
          Текущая версия сайта статична и написана в ознакомительных целях. У вас есть возможность пользоваться функционалом до перезагрузки страницы. После все внесённые вами изменения пропадут.
        </Alert>
      </Snackbar>
    </>
  );
};
