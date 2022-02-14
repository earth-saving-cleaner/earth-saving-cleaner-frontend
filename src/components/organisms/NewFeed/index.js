import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { noop } from "lodash";

import { getAddressFromLatLng, addNewFeed } from "../../../api";
import { Icon, Textarea } from "../../atoms";
import { NewFeedHeader } from "../../molecules";
import themes from "../../../theme/theme";
import ImageUpload from "../ImageUpload";
import { isTokenExpired } from "../../../utils";
import { userSliceActions } from "../../../modules/slices/userSlice";
import { feedSliceActions } from "../../../modules/slices/feedSlice";

const { colors } = themes;

const Container = styled.div`
  display: flex;
  width: 90rem;
  height: 60rem;
  background: ${({ theme }) => theme.colors.white};
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50rem;
  height: 100%;
  background: ${({ theme }) => theme.opacityColor.gray};
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 100%;
  padding: 1rem;
`;

const CloseWrapper = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 2rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 2rem;
`;

const AddressWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  text-align: right;
`;

function NewFeed({ onClickModalClose }) {
  const [pictureUrl, setPictureUrl] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  const [photoAddress, setPhotoAddress] = useState("");
  const [address, setAddress] = useState("Please enter your address");
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.user.data);

  const getImage = (data) => {
    const { imageUrl, locationFromMeta } = data;
    setPictureUrl(imageUrl);
    setLocation(locationFromMeta);
  };

  const handleTextChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const addressFromPhoto = await getAddressFromLatLng(location);
        setPhotoAddress(addressFromPhoto.slice(5));
      } catch (err) {
        console.error(err);
      }
    };

    if (pictureUrl) {
      getAddress();
    }
  }, [pictureUrl]);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await geocodeByAddress(String(inputAddress));
        const result = await getLatLng(response[0]);

        setLocation(result);

        return result;
      } catch (err) {
        console.error(err);
        return err.message;
      }
    };

    if (inputAddress) {
      getCoordinates();
    }
  }, [inputAddress]);

  useEffect(() => {
    if (!photoAddress && !inputAddress) {
      setAddress("Please enter your address");
    }

    if (photoAddress) {
      setAddress(photoAddress);
    }

    if (!photoAddress && inputAddress) {
      setAddress(inputAddress);
    }
  }, [address, photoAddress, inputAddress]);

  const handleNewFeedSave = async () => {
    const feedDetail = {
      pictureUrl: [pictureUrl],
      content,
      location: [location[1], location[0]],
      address,
      userInfo,
    };

    if (!feedDetail) return;

    try {
      const response = await addNewFeed(feedDetail);
      const isvalid = await isTokenExpired(response);

      if (isvalid) {
        history.push("/login");
        dispatch(userSliceActions.logout());
      } else {
        onClickModalClose();
        dispatch(feedSliceActions.getFeeds({ limit: 3 }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <ImageWrapper>
        <ImageUpload getImage={getImage} />
      </ImageWrapper>
      <ContentsWrapper>
        <CloseWrapper>
          <Icon icon="close" size="md" onClickIcon={onClickModalClose} />
        </CloseWrapper>
        <HeaderWrapper>
          <NewFeedHeader nickname={userInfo.nickname} url={userInfo.profileImage} />
          <Icon icon="save" size="sm" onClickIcon={handleNewFeedSave} />
        </HeaderWrapper>
        <Textarea
          background="gray_4"
          borderWidth="0"
          radius="0.6rem"
          width="90%"
          height="18rem"
          value={content}
          onChange={handleTextChange}
        />
        <AddressWrapper>
          <Icon icon="location" size="md" fill={colors.gray_3} />
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            selectProps={{
              inputAddress,
              onChange: setInputAddress,
              placeholder: address,
              styles: {
                input: (base) => ({
                  ...base,
                  width: "270px",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontStyle: "italic",
                  fontSize: "12px",
                }),
              },
            }}
          />
        </AddressWrapper>
      </ContentsWrapper>
    </Container>
  );
}

NewFeed.propTypes = {
  onClickModalClose: PropTypes.func,
};

NewFeed.defaultProps = {
  onClickModalClose: noop,
};

export default NewFeed;
