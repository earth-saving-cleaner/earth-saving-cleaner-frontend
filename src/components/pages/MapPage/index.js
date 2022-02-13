import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { Icon } from "../../atoms";
import { Result } from "../../organisms";
import { MapTemplate, QuestTemplate, QuestResultTemplate } from "../../templates";
import Portal from "../../templates/Portal";

import { getFeedInfo } from "../../../api";
import theme from "../../../theme/theme";
import { userSliceActions } from "../../../modules/slices/userSlice";

const StyledIcon = styled(Icon)`
  color: ${(props) => props.color};
`;

function MapPage() {
  const [defaultProps, setDefaultProps] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  const [boundary, setBoundary] = useState({});
  const [feedLocation, setFeedLocation] = useState([]);
  const [modalClick, setModalClick] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [ploggingResult, setPloggingResult] = useState("");
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.user);

  function handleFloggingButton({ image, coordinates, feedId }) {
    setModalClick(true);
    setModalInfo({
      image,
      coordinates,
      feedId,
    });
  }

  function closeModalButton() {
    setModalClick(false);
  }

  function handleQuestCloseButton() {
    setPloggingResult(null);
  }

  function spreadFeeds() {
    return feedLocation.map((feed) => {
      const { _id, image, cleaned, coordinates } = feed;
      const [longitude, latitude] = coordinates;
      const iconType = cleaned ? "leaf" : "trashCanFill";
      const color = cleaned ? theme.colors.green_1 : theme.colors.red;
      const params = {
        image,
        coordinates,
        feedId: _id,
      };

      return (
        <StyledIcon
          key={_id}
          lat={latitude}
          lng={longitude}
          icon={iconType}
          color={color}
          onClickIcon={() => (cleaned ? null : handleFloggingButton(params))}
        />
      );
    });
  }

  function calCuateDistance({ coords }) {
    const { latitude, longitude } = coords;
    const targetLatitude = modalInfo.coordinates[1];
    const targetLongitude = modalInfo.coordinates[0];

    const x = ((Math.cos(targetLatitude) * 6400 * 2 * Math.PI) / 360) * Math.abs(targetLongitude - longitude);
    const y = 111 * Math.abs(targetLatitude - latitude);
    const distance = Math.sqrt(x ** 2 + y ** 2) * 1000;

    setModalClick(false);

    if (distance < 1000) {
      setPloggingResult("success");

      const id = modalInfo.feedId;
      const userId = data?.id;

      dispatch(userSliceActions.addScore({ id, userId }));
    } else {
      setPloggingResult("failure");
    }
  }

  function handleCleanButtonClick() {
    const option = {
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(
      calCuateDistance,
      () => {
        alert("please accept your location.");
      },
      option,
    );
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDefaultProps({
          // user accept current location.
          center: {
            lat: latitude,
            lng: longitude,
          },
          zoom: 14,
        });
      },
      () => {
        setDefaultProps({
          // user denied user current location.
          center: {
            lat: 37.50805,
            lng: 127.06135,
          },
          zoom: 14,
        });
        alert("please accept your location.");
      },
    );
  }, []);

  useEffect(() => {
    async function getFeedLocation() {
      const result = await getFeedInfo(boundary);
      setFeedLocation(result);
    }

    if (Object.keys(boundary).length) {
      getFeedLocation();
    }
  }, [zoomLevel, boundary, ploggingResult]);

  return (
    <>
      <MapTemplate>
        {defaultProps && (
          <GoogleMapReact
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            onChange={({ zoom, bounds, ...props }) => {
              setZoomLevel(zoom);
              setBoundary({
                NWlatitude: bounds.nw.lat,
                NWlongitude: bounds.nw.lng,
                SElatitude: bounds.se.lat,
                SElongitude: bounds.se.lng,
              });
            }}
          >
            {spreadFeeds()}
          </GoogleMapReact>
        )}
      </MapTemplate>
      {modalClick && modalInfo && (
        <Portal wrapperId="modal-container">
          <QuestTemplate
            onCloseClick={() => closeModalButton()}
            onClickCleanButton={() => handleCleanButtonClick()}
            image={modalInfo.image}
          />
        </Portal>
      )}
      {ploggingResult && (
        <Portal wrapperId="modal-container">
          <QuestResultTemplate onCloseClick={() => handleQuestCloseButton()}>
            <Result result={ploggingResult} />
          </QuestResultTemplate>
        </Portal>
      )}
    </>
  );
}

export default MapPage;
