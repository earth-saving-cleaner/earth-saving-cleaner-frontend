import axios from "axios";
import Geocode from "react-geocode";

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

export const addPhotoToAWS = async (formData) => {
  try {
    // S3 실 통신 가능 여부 확인 완료. 테스트 진행 시, 아래 mock data로 처리!
    // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/feed/img`, formData, {
    //   header: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // return response.data;
    const response = {
      originalUrl:
        "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/original/1644598340028KakaoTalk_Photo_2022-02-01-20-20-16.jpeg",
      url: "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/thumb/1644598340028KakaoTalk_Photo_2022-02-01-20-20-16.jpeg",
    };
    return response;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("ko");
Geocode.enableDebug();
// imageUrl :
// {image: "blob:http://localhost:3000/ff4a4ec0-e321-4c5f-9fa9-ad091153ff0a",
// location: [37.488033333333334, 126.85566666666666]}
export const getAddressFromLatLng = async (imageUrl) => {
  try {
    const response = await Geocode.fromLatLng(imageUrl.location[0], imageUrl.location[1]);
    const address = response.results[0].formatted_address;
    return address;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

export const addNewFeed = async (feedDetail) => {
  const { pictureUrl, content, location, userInfo } = feedDetail;
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/feed`, {
      headers: {
        Authorization: `Bearer ${userInfo}`,
      },
      data: { pictureUrl, content, location },
    });

    return response;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};
