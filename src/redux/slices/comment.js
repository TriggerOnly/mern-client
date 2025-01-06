import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchComments = createAsyncThunk('/posts/fetchComment', async (id) => {
    const {data} = await axios.post(`/posts/${id}`)
    return data
})