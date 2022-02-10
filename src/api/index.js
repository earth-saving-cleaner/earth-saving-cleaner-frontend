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
