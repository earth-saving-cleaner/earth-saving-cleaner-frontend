import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { getAddressFromLatLng, addNewFeed } from "../../../api";
import { Icon, Textarea } from "../../atoms";
import { NewFeedHeader } from "../../molecules";
import themes from "../../../theme/theme";
import ImageUpload from "../ImageUpload";

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

function NewFeed({ handleClose }) {
  const [pictureUrl, setPictureUrl] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  const [photoAddress, setPhotoAddress] = useState("");
  const [address, setAddress] = useState("Please enter your address");
  const [isSaved, setIsSaved] = useState(false);
  const userInfo = useSelector((state) => state.data.token);
  const history = useHistory();
  const imgSrc = "https://www.vanillacoding.co/images/team/ken.jpg";
  const nickname = "ken";

  const getImage = (data) => {
    const { imageUrl, locationFromMeta } = data;
    setPictureUrl(imageUrl);
    setLocation(locationFromMeta);
  };

  const handleTextChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const addressFromPhoto = await getAddressFromLatLng(pictureUrl);
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
        console.log("result>>>>>", result);
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

  useEffect(async () => {
    const feedDetail = {
      pictureUrl,
      content,
      location,
      userInfo,
    };

    try {
      const response = await addNewFeed(feedDetail);
      console.log(response);

      if (response) {
        // loginsliceAction.logout();
        history.push("/login");
      }

      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }, [isSaved]);

  return (
    <Container>
      <ImageWrapper>
        <ImageUpload getImage={getImage} />
      </ImageWrapper>
      <ContentsWrapper>
        <CloseWrapper>
          <Icon icon="close" size="md" onClickIcon={handleClose} />
        </CloseWrapper>
        <HeaderWrapper>
          <NewFeedHeader nickname={nickname} url={imgSrc} />
          <Icon icon="save" size="sm" onClickIcon={handleSave} />
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
  handleClose: PropTypes.func.isRequired,
};

export default NewFeed;
