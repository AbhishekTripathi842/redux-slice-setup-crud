import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
  id?: number;
  title: string;
  body: string;
}

interface DataState {
  data: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addData = createAsyncThunk('data/addData', async (newData: Post) => {
  const response = await axios.post(API_URL, newData);
  return response.data;
});

export const updateData = createAsyncThunk('data/updateData', async (updatedData: Post) => {
  const response = await axios.put(`${API_URL}/${updatedData.id}`, updatedData);
  return response.data;
});

export const deleteData = createAsyncThunk('data/deleteData', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Post[]>) => {
        console.log("actionnnnn",action.type)
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(addData.fulfilled, (state, action: PayloadAction<Post>) => {
        state.data.push(action.payload);
      })
      .addCase(updateData.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.data.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteData.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter(item => item.id !== action.payload);
      });
  },
});

export default dataSlice.reducer;
