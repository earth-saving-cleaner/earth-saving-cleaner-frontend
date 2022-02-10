import React, { useState, useEffect } from "react";

import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { getFeedInfo } from "../../../api";
import theme from "../../../theme/theme";
import { Icon } from "../../atoms";
import { MapTemplate } from "../../templates";

const StyledIcon = styled(Icon)`
  color: ${(props) => props.color};
`;

function MapPage() {
  const [defaultProps, setDefaultProps] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  const [boundary, setBoundary] = useState({});
  const [feedLocation, setFeedLocation] = useState([]);

  function spreadFeeds() {
    return feedLocation.map((feed) => {
      const { _id, image, cleaned, coordinates } = feed;
      const [longitude, latitude] = coordinates;
      const iconType = cleaned ? "leaf" : "trashCanFill";
      const color = cleaned ? theme.colors.green_1 : theme.colors.red;

      return <StyledIcon key={_id} lat={latitude} lng={longitude} icon={iconType} color={color} />;
    });
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
  }, [zoomLevel, boundary]);

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
        </GoogleMapReact>
      )}
    </MapTemplate>
  );
}

export default MapPage;
