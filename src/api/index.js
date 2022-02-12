import axios from "axios";

export const getFeeds = async (payload) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/feeds`;
  const result = await axios.get(url, {
    params: payload,
  });

  return result.data;
};

export const addLikeUser = async (payload) => {
  const { feedId, userId } = payload;

  const url = `${process.env.REACT_APP_SERVER_URL}/feed/${feedId}/like`;
  const result = await axios.put(url, {
    userId,
  });

  return result.data;
};

export const getFeedInfo = async (boundary) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/feeds/locations`, {
      params: { coordinates: boundary },
    });

    return response.data.feedInfo;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const getFeed = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/feed/${id}`);

    return response.data.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const addComment = async ({ id, userId, commentText }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/feed/${id}/comment`, {
      userId,
      content: commentText,
    });

    return response.data.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};
