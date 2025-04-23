import { getAllNotes } from '@/services/notes';
import { createSlice } from '@reduxjs/toolkit';

interface noteState {
  notes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: noteState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all notes
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delete note
    //   .addCase(deletenote.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(deletenote.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.notes = state.notes.filter((note) => note._id !== action.meta.arg);
    //   })
    //   .addCase(deletenote.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

export default noteSlice.reducer;
