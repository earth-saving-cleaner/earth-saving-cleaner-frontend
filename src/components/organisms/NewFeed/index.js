import React, { useEffect, useState } from "react";

import { noop } from "lodash";
import PropTypes from "prop-types";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { getAddressFromLatLng, addNewFeed } from "../../../api";
import { feedSliceActions } from "../../../modules/slices/feedSlice";
import { userSliceActions } from "../../../modules/slices/userSlice";
import themes from "../../../theme/theme";
import { isTokenExpired } from "../../../utils";
import { Icon, Textarea, Img } from "../../atoms";
import { NewFeedHeader } from "../../molecules";

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
  background: ${({ theme }) => theme.opacityColor.gray_1};
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
  font-size: 1.2rem;
`;

function NewFeed({ onModalCloseClick, imageInfo }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.data);

  const { urls, metaLocations } = imageInfo;
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("Please enter your address");

  useEffect(() => {
    const getAddress = async () => {
      if (metaLocations[0] !== null) {
        const imageAddress = await getAddressFromLatLng([metaLocations[1], metaLocations[0]]);
        setAddress(imageAddress.slice(5));
      }
    };

    getAddress();
  }, [metaLocations]);

  const handleSaveClick = async () => {
    try {
      const addressString = metaLocations[0] !== null ? address : address.label;
      const response = await geocodeByAddress(addressString);
      const result = await getLatLng(response[0]);
      const coordinates = [result.lng, result.lat];

      const feed = await addNewFeed({
        pictureUrl: [urls.originalUrl],
        content,
        location: coordinates,
        address: addressString,
        token: userInfo.token,
      });

      const authentication = await isTokenExpired(feed);

      if (authentication) {
        history.push("/login");
        dispatch(userSliceActions.logout());
      } else {
        dispatch(feedSliceActions.getFeeds({ limit: 3 }));
        onModalCloseClick(false);
        history.push("/");
      }
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };

  return (
    <Container>
      <ImageWrapper>
        <Img alt="feed image" src={imageInfo.urls.originalUrl} />
      </ImageWrapper>
      <ContentsWrapper>
        <CloseWrapper>
          <Icon icon="close" size="md" onClickIcon={() => onModalCloseClick(false)} />
        </CloseWrapper>
        <HeaderWrapper>
          <NewFeedHeader nickname={userInfo.nickname} url={userInfo.profileImage} />
          <Icon icon="save" size="sm" onClickIcon={handleSaveClick} />
        </HeaderWrapper>
        <Textarea
          background="gray_4"
          borderWidth="0"
          radius="0.6rem"
          width="90%"
          height="18rem"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <AddressWrapper>
          <Icon icon="location" size="md" fill={colors.gray_3} />
          <GooglePlacesAutocomplete
            id="addressInput"
            apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            selectProps={{
              address,
              onChange: setAddress,
              placeholder: address,
              styles: {
                input: (base) => ({
                  ...base,
                  width: "27rem",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontStyle: "italic",
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
  onModalCloseClick: PropTypes.func,
  imageInfo: PropTypes.shape({
    urls: PropTypes.shape({
      result: PropTypes.string,
      originalUrl: PropTypes.string,
      url: PropTypes.string,
    }),
    metaLocations: PropTypes.arrayOf(PropTypes.number),
  }),
};

NewFeed.defaultProps = {
  onModalCloseClick: noop,
  imageInfo: { urls: null, metaLocations: [null, null] },
};

export default NewFeed;
