import axios from "axios";

export const login = async (tokenId) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/login`;
  const result = await axios({
    url,
    method: "post",
    data: {
      token: tokenId,
    },
  });

  return result.data;
};

export const signup = async (payload) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/signup`;
  const result = await axios({
    url,
    method: "post",
    data: payload,
  });

  return result.data;
};

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

export const addComment = async ({ id, userId, commentText, token }) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/feed/${id}/comment`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        content: commentText,
      },
    });

    return response.data.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};
