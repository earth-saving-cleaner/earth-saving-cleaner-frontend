import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  feeds: null,
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getFeeds: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getFeedsSuccess: (state, action) => {
      state.isLoading = false;
      state.feeds = action.payload;
      state.error = null;
    },
    getFeedsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addLikeUser: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addLikeUserSuccess: (state, action) => {
      state.isLoading = false;

      const feedData = state.feeds.data.find((feed) => feed._id === action.payload.data._id);

      if (feedData) {
        feedData.like = action.payload.data.like;
      }
      state.error = null;
    },
    addLikeUserFailure: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    addFeeds: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addFeedsSuccess: (state, action) => {
      state.isLoading = false;

      action.payload.data.forEach((feed) => {
        state.feeds.data.push(feed);
      });

      state.feeds.lastId = action.payload.lastId;
      state.error = null;
    },
    addFeedsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addComment: (state, action) => {
      const feedData = state.feeds.data;

      for (let i = 0; i < feedData.length; i += 1) {
        if (feedData[i]._id === action.payload.feedId) {
          feedData[i].comment.push(action.payload.commentId);
          return;
        }
      }
    },
  },
});

export const feedSliceActions = feedSlice.actions;
export default feedSlice.reducer;
