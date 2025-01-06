import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (_id) => {
    axios.delete(`/posts/${_id}`)
})

export const fetchPostsByTag = createAsyncThunk(
    'posts/fetchPostsByTag',
    async (tag) => {
      console.log(`Fetching posts for tag: ${tag}`); // Лог перед запросом
      const { data } = await axios.get(`/posts?tag=${tag}`);
      console.log(data); // Лог полученных данных
      return data;
    }
  );
  

const postsSlice = createSlice({
    name:  'posts',
    initialState: {
        posts: {
          items: [],
          status: 'loading', 
        },
        tags: {
          items: [],
          status: 'loading',
        },
      },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.posts.items = []
                state.posts.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload
                state.posts.status = 'loaded'
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts.items = []
                state.posts.status = 'error'
            })
            .addCase(fetchTags.pending, (state) => {
                state.tags.items = []
                state.tags.status = 'loading'
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload
                state.tags.status = 'loaded'
            })
            .addCase(fetchTags.rejected, (state) => {
                state.tags.items = []
                state.tags.status = 'error'
            })
            .addCase(fetchRemovePost.pending, (state, action) => {
                state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
            })
            .addCase(fetchPostsByTag.pending, (state) => {
                state.posts.status = 'loading';
            })
            .addCase(fetchPostsByTag.fulfilled, (state, action) => {
                state.posts.items = action.payload;
                state.posts.status = 'loaded';
            })
            .addCase(fetchPostsByTag.rejected, (state) => {
                state.posts.status = 'error';
            })
    }
})

export const postsReducer = postsSlice.reducer

