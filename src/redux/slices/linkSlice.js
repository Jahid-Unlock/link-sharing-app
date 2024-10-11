import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  links: [
    { id: 1, platform: 'Hashnode', url: 'https://www.hashnode.com/@' },
    { id: 2, platform: 'Frontend Mentor', url: 'https://www.frontendmentor.io/profile/' },
  ],
};

const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    removeLink: (state, action) => {
      state.links = state.links.filter((link) => link.id !== action.payload);
    },
    updateLink: (state, action) => {
      const index = state.links.findIndex((link) => link.id === action.payload.id);
      if (index !== -1) {
        state.links[index] = action.payload;
      }
    },
  },
});

export const { addLink, removeLink, updateLink } = linkSlice.actions;

export default linkSlice.reducer;
