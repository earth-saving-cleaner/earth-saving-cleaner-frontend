import axios from "axios";
import Geocode from "react-geocode";

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
    return err.message;
  }
};

export const getFeed = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/feed/${id}`);

    return response.data.data;
  } catch (err) {
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
    return err.message;
  }
};

export const addPhotoToAWS = async (formData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/feed/img`, formData, {
      header: {
        "content-type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    return err.message;
  }
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
Geocode.enableDebug();

export const getAddressFromLatLng = async (location) => {
  try {
    const response = await Geocode.fromLatLng(location[0], location[1]);
    const address = response.results[0].formatted_address;
    return address;
  } catch (err) {
    return err.message;
  }
};

export const addNewFeed = async (feedDetail) => {
  const { pictureUrl, content, location, address, token } = feedDetail;

  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/feed`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: { pictureUrl, content, location, address },
    });

    return response;
  } catch (err) {
    return err.message;
  }
};

export const addScore = async (payload) => {
  const { userId, id } = payload;

  try {
    const response = axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/feed/${id}/plogging`,
      data: { userId },
    });

    return response;
  } catch (err) {
    return err.message;
  }
};

export const getRankList = async (userInfo) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/user/rank`,
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    return response;
  } catch (err) {
    return err.message;
  }
};
