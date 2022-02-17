import React, { useState, useEffect } from "react";

import GoogleMapReact from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { getFeedInfo } from "../../../api";
import useSocket from "../../../hooks/useSocket";
import { userSliceActions } from "../../../modules/slices/userSlice";
import theme from "../../../theme/theme";
import { Icon, GpsIcon, Loading } from "../../atoms";
import { QuestResult, UserCard } from "../../organisms";
import { MapTemplate, QuestTemplate, QuestResultTemplate } from "../../templates";
import Portal from "../../templates/Portal";

const StyledIcon = styled(Icon)`
  color: ${(props) => props.color};
`;

function MapPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);

  const [socket, disconnect] = useSocket("map");

  const [defaultProps, setDefaultProps] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(17);
  const [boundary, setBoundary] = useState({});

  const [feedLocation, setFeedLocation] = useState([]);
  const [userGps, setUserGps] = useState();
  const [gpsLocations, setGpsLocations] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [ploggingResult, setPloggingResult] = useState("");
  const [loading, setLoading] = useState(true);

  function handleFloggingButtonClick({ image, coordinates, feedId, author }) {
    if (!data?.token) {
      history.push("/login");
    }

    setIsModalOpen(true);
    setModalInfo({
      image: image[0],
      coordinates,
      feedId,
      avatarImage: author.profileImage,
      nickname: author.nickname,
      level: author.level,
    });
  }

  function spreadFeeds() {
    return feedLocation.map((feed) => {
      const { _id, image, cleaned, coordinates, author } = feed;
      const [longitude, latitude] = coordinates;
      const iconType = cleaned ? "leaf" : "trashCanFill";
      const color = cleaned ? theme.colors.green_1 : theme.colors.red;
      const params = {
        image,
        coordinates,
        feedId: _id,
        author: author[0],
      };

      return (
        <StyledIcon
          key={_id}
          lat={latitude}
          lng={longitude}
          icon={iconType}
          color={color}
          onClickIcon={() => (cleaned ? null : handleFloggingButtonClick(params))}
          size="sm"
        />
      );
    });
  }

  function paintGpsLocations() {
    return Object.keys(gpsLocations)?.map((socketId) => {
      const { location, sid } = gpsLocations[socketId];

      if (location?.longitude) {
        if (socket.id === sid) {
          return <GpsIcon key={sid} color="yellow" lat={location.latitude} lng={location.longitude} />;
        }

        return <GpsIcon key={sid} color="purple" lat={location.latitude} lng={location.longitude} />;
      }

      return null;
    });
  }

  function watchPositionSuccess(position) {
    const { longitude, latitude } = position.coords;
    setUserGps({ longitude, latitude });
  }

  function watchPositionError(err) {
    console.warn(err.code, err.message);
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 20000,
    maximumAge: Infinity,
  };

  function calCulateDistance({ coords }) {
    const { latitude, longitude } = coords;
    const targetLatitude = modalInfo.coordinates[1];
    const targetLongitude = modalInfo.coordinates[0];

    const x = ((Math.cos(targetLatitude) * 6400 * 2 * Math.PI) / 360) * Math.abs(targetLongitude - longitude);
    const y = 111 * Math.abs(targetLatitude - latitude);
    const distance = Math.sqrt(x ** 2 + y ** 2) * 1000;

    setIsModalOpen(false);

    if (distance < 30) {
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
      enableHighAccuracy: false,
      maximumAge: 30000,
    };

    navigator.geolocation.getCurrentPosition(calCulateDistance, () => {}, option);
  }

  function handleApiLoaded(map, maps) {
    maps.event.addListener(map, "tilesloaded", () => {
      setLoading(false);
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        socket.emit("join", { userId: "testId", location: { longitude, latitude } });

        setUserGps({ longitude, latitude });

        setDefaultProps({
          // user accept current location.
          center: {
            lat: latitude,
            lng: longitude,
          },
          zoom: 17,
        });
      },
      () => {
        setDefaultProps({
          // user denied user current location.
          center: {
            lat: 37.50815,
            lng: 127.06135,
          },
          zoom: 14,
        });
      },
      options,
    );

    const watchId = navigator.geolocation.watchPosition(watchPositionSuccess, watchPositionError, options);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
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

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("locations", (locations) => {
      setGpsLocations(locations);
    });

    return () => {
      disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (userGps?.longitude) {
      socket.emit("gps", userGps);
    }
  }, [userGps]);

  return (
    <>
      <MapTemplate>
        {loading ? <Loading /> : null}
        {defaultProps && (
          <GoogleMapReact
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            onChange={({ zoom, bounds }) => {
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
            {paintGpsLocations()}
          </GoogleMapReact>
        )}
      </MapTemplate>
      {isModalOpen && modalInfo && (
        <Portal wrapperId="modal-container">
          <QuestTemplate onCloseClick={() => setIsModalOpen(false)}>
            <UserCard
              onClickCleanButton={() => handleCleanButtonClick()}
              image={modalInfo.image}
              avatarImage={modalInfo.authorImage}
              level={modalInfo.level}
              nickname={modalInfo.nickname}
            />
          </QuestTemplate>
        </Portal>
      )}
      {ploggingResult && (
        <Portal wrapperId="modal-container">
          <QuestResultTemplate onCloseClick={() => setPloggingResult(null)}>
            <QuestResult result={ploggingResult} level={data?.level} />
          </QuestResultTemplate>
        </Portal>
      )}
    </>
  );
}

export default MapPage;
