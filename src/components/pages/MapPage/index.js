import React, { useState, useEffect } from "react";

import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import axios from "axios";

import { Icon } from "../../atoms";
import { MapTemplate } from "../../templates";
import theme from "../../../theme/theme";

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

      if (cleaned) {
        return <StyledIcon key={_id} lat={latitude} lng={longitude} icon="leaf" color={theme.colors.green_1} />;
      }

      return <StyledIcon key={_id} lat={latitude} lng={longitude} icon="trashCanFill" color={theme.colors.red} />;
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setDefaultProps({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 14,
      });
    });
  }, []);

  useEffect(() => {
    async function getFeedInfo() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/feeds/locations`, {
          params: { coordinates: boundary },
        });

        setFeedLocation(response.data.feedInfo);
        return response.data.result;
      } catch (err) {
        console.error(err);
        return err.message;
      }
    }

    if (Object.keys(boundary).length) {
      getFeedInfo();
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
