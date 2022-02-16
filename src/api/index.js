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
    // S3 실 통신 가능 여부 확인 완료. 테스트 진행 시, 아래 mock data로 처리!
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/feed/img`, formData, {
      header: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;

    // const response = {
    //   originalUrl:
    //     "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/original/1644598340028KakaoTalk_Photo_2022-02-01-20-20-16.jpeg",
    //   url: "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/thumb/1644598340028KakaoTalk_Photo_2022-02-01-20-20-16.jpeg",
    // };

    // const response = {
    //   url: "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/thumb/16440510063602180494_202118_264.jpeg",
    //   originalUrl:
    //     "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/original/16440510063602180494_202118_264.jpeg",
    // };
    // return response;
  } catch (err) {
    return err.message;
  }
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
Geocode.enableDebug();

// location: [37.488033333333334, 126.85566666666666]}
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
  const { pictureUrl, content, location, address, userInfo } = feedDetail;

  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/feed`,
      headers: {
        authorization: `Bearer ${userInfo.token}`,
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
