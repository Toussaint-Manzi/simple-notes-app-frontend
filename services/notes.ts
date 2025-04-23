import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';


// ------------------------------------------------------------ GET METHODS ------------------------------------------------------------
export const getAllNotes = createAsyncThunk(
    'notes/getAllNotes',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get('/notes/');
        console.log('getAllNotes', data);
        return data.results;
      } catch (error) {
        return rejectWithValue('Failed to fetch notes');
      }
    }
);

// ------------------------------------------------------------ POST METHODS ------------------------------------------------------------

export const addNote = createAsyncThunk(
    'notes/addNote',
    async (noteData: { title: string; content: string; type: string }, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post('/notes/', noteData);
        return data;
      } catch (error) {
        return rejectWithValue('Failed to add note');
      }
    }
  );

// ------------------------------------------------------------ PATCH METHODS ------------------------------------------------------------

  export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, noteData }: { id: string; noteData: { title: string; content: string; type: string } }, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.patch(`/notes/${id}/`, noteData);
        return data;
      } catch (error) {
        return rejectWithValue('Failed to update note');
      }
    }
  );

// ------------------------------------------------------------ PATCH METHODS ------------------------------------------------------------

  export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id: string, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`/notes/${id}/`)
        return id
      } catch (error) {
        return rejectWithValue('Failed to delete note')
      }
    }
  )
