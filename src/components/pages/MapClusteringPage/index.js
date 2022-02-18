import React, { useState, useEffect } from "react";

import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { getFeedInfo } from "../../../api";
import theme from "../../../theme/theme";
import { Icon, Loading, ClusterCircle } from "../../atoms";

const StyledIcon = styled(Icon)`
  color: ${(props) => props.color};
`;

function MapClusteringPage() {
  const [loading, setLoading] = useState(true);
  const [defaultProps, setDefaultProps] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(17);
  const [boundary, setBoundary] = useState({});
  const [spreadFeed, setSpreadFeed] = useState([]);

  function calcDistance(zoom) {
    switch (zoom) {
      case 16:
        return 100;
      case 15:
        return 300;
      case 14:
        return 500;
      case 13:
        return 700;
      default:
        return 0;
    }
  }

  function getDistance(originLat, originLng, targetLat, targetLng) {
    const x = (Math.cos(originLat * 6400 * 2 * Math.PI) / 360) * Math.abs(originLng - targetLng);
    const y = 111 * Math.abs(originLat - targetLat);
    const distance = Math.sqrt(x ** 2 + y ** 2) * 1000;

    return distance;
  }

  function calCluster(marker) {
    const result = [];

    for (let i = 0; i < marker.length - 1; i += 1) {
      let numberCount = 1;

      for (let j = i + 1; j < marker.length; j += 1) {
        if (!marker[j].cluster && marker[i].cleaned === marker[j].cleaned) {
          const distance = getDistance(marker[i].lat, marker[i].lng, marker[j].lat, marker[j].lng);

          if (distance < calcDistance(zoomLevel)) {
            marker[j].cluster = true;
            numberCount += 1;
          }
        }

        if (j === marker.length - 1) {
          if (marker[i].cluster) continue;

          result.push({
            id: marker[i].id,
            cluster: false,
            lat: marker[i].lat,
            lng: marker[i].lng,
            number: numberCount,
            cleaned: marker[i].cleaned,
          });
        }
      }
    }

    return result;
  }

  function convertToClusterFormat(feeds) {
    const result = feeds.map((feed) => {
      return {
        id: feed._id,
        lng: feed.coordinates[0],
        lat: feed.coordinates[1],
        cleaned: feed.cleaned,
        number: 1,
        cluster: false,
      };
    });

    return result;
  }

  function paintFeedsInfo(feedInfo) {
    return feedInfo.map((feed) => {
      const { id, lng, lat, cleaned } = feed;
      const iconType = cleaned ? "leaf" : "trashCanFill";
      const color = cleaned ? theme.colors.green_1 : theme.colors.red;

      return <StyledIcon key={id} lat={lat} lng={lng} icon={iconType} color={color} size="sm" />;
    });
  }

  function paintCluster(result) {
    return result.map((feed) => {
      const { id, lng, lat, cleaned, number } = feed;
      const color = cleaned ? theme.opacityColor.green : theme.opacityColor.red;

      return <ClusterCircle key={id} lat={lat} lng={lng} size={number} color={color} />;
    });
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

        setDefaultProps({
          center: {
            lat: latitude,
            lng: longitude,
          },
          zoom: 17,
        });
      },
      () => {
        setDefaultProps({
          center: {
            lat: 37.50815,
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
      const convertResult = convertToClusterFormat(result);

      let calculation;

      if (zoomLevel < 17) {
        const calculateResult = calCluster(convertResult);

        calculation = paintCluster(calculateResult);
      } else {
        calculation = paintFeedsInfo(convertResult);
      }

      setSpreadFeed(calculation);
    }

    if (Object.keys(boundary).length) {
      getFeedLocation();
    }
  }, [zoomLevel, boundary]);

  return (
    <>
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
          {spreadFeed}
        </GoogleMapReact>
      )}
    </>
  );
}

export default MapClusteringPage;
