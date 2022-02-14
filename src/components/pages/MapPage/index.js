import React, { useState, useEffect, useRef } from "react";

import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { getFeedInfo } from "../../../api";
import theme from "../../../theme/theme";
import { Icon, GpsIcon } from "../../atoms";
import { MapTemplate } from "../../templates";

import useSocket from "../../../hooks/useSocket";

const StyledIcon = styled(Icon)`
  color: ${(props) => props.color};
`;

function MapPage() {
  const [socket, disconnect] = useSocket("map");
  const [defaultProps, setDefaultProps] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  const [boundary, setBoundary] = useState({});
  const [feedLocation, setFeedLocation] = useState([]);
  // const userGps = useRef();
  const [userGps, setUserGps] = useState();
  const [gpsLocations, setGpsLocations] = useState({});

  function spreadFeeds() {
    return feedLocation.map((feed) => {
      const { _id, image, cleaned, coordinates } = feed;
      const [longitude, latitude] = coordinates;
      const iconType = cleaned ? "leaf" : "trashCanFill";
      const color = cleaned ? theme.colors.green_1 : theme.colors.red;

      return <StyledIcon key={_id} lat={latitude} lng={longitude} icon={iconType} color={color} size="sm" />;
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
          zoom: 14,
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
  }, [zoomLevel, boundary]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

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
    <MapTemplate>
      {defaultProps && (
        <GoogleMapReact
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
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
  );
}

export default MapPage;
