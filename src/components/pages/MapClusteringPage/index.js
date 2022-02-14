import React, { useState, useEffect } from "react";

import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { getFeedInfo } from "../../../api";
import theme from "../../../theme/theme";
import { Icon, Loading, ClusterCircle } from "../../atoms";
import { MapTemplate } from "../../templates";

const StyledIcon = styled(Icon)`
  color: ${(props) => props.color};
`;

function MapClusteringPage() {
  const [loading, setLoading] = useState(true);
  const [defaultProps, setDefaultProps] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(17);
  const [boundary, setBoundary] = useState({});

  const [originalLocations, setOriginalLocations] = useState([]);
  const [cleanClusterLocations, setCleanClusterLocations] = useState([]);
  const [dirtClusterLocations, setDirtClusterLocations] = useState([]);

  function calcDistance(zoom) {
    switch (zoom) {
      case 16:
        return 1000;
      case 15:
        return 2000;
      case 14:
        return 3000;
      case 13:
        return 5000;
      case 12:
        return 10000;
      case 11:
        return 20000;
      case 10:
        return 30000;
      case 9:
        return 40000;
      default:
        return 1000;
    }
  }

  function calcCleanCluster(marker) {
    const result = [];

    for (let i = 0; i < marker.length - 1; i += 1) {
      if (marker[i].cluster || !marker[i].cleaned) continue;

      let distance = 1000;
      let count = 1;

      for (let j = i + 1; j < marker.length; j += 1) {
        if (marker[j].cluster || !marker[j].cleaned) {
          if (marker.length - 1 === j) {
            result.push({
              id: marker[i].id,
              cluster: false,
              lat: marker[i].lat,
              lng: marker[i].lng,
              number: count,
              cleaned: marker[i].cleaned,
            });
          }

          continue;
        }

        const x = ((Math.cos(marker[i].lat) * 6400 * 2 * Math.PI) / 360) * Math.abs(marker[i].lng - marker[j].lng);
        const y = 111 * Math.abs(marker[i].lat - marker[j].lat);
        distance = Math.sqrt(x ** 2 + y ** 2) * 1000;

        if (distance < calcDistance(zoomLevel)) {
          marker[j].cluster = true;
          count += 1;

          if (j === marker.length - 1) {
            result.push({
              id: marker[i].id,
              cluster: false,
              lat: marker[i].lat,
              lng: marker[i].lng,
              number: count,
              cleaned: marker[i].cleaned,
            });
          }
        }
      }
    }

    return result;
  }

  function calcDirtCluster(marker) {
    const result = [];

    for (let i = 0; i < marker.length - 1; i += 1) {
      if (marker[i].cluster || marker[i].cleaned) continue;

      let distance = 1000;
      let count = 1;

      for (let j = i + 1; j < marker.length; j += 1) {
        if (marker[j].cluster || marker[j].cleaned) {
          if (marker.length - 1 === j) {
            result.push({
              id: marker[i].id,
              cluster: false,
              lat: marker[i].lat,
              lng: marker[i].lng,
              number: count,
              cleaned: marker[i].cleaned,
            });
          }

          continue;
        }

        const x = ((Math.cos(marker[i].lat) * 6400 * 2 * Math.PI) / 360) * Math.abs(marker[i].lng - marker[j].lng);
        const y = 111 * Math.abs(marker[i].lat - marker[j].lat);
        distance = Math.sqrt(x ** 2 + y ** 2) * 1000;

        if (distance < calcDistance(zoomLevel)) {
          marker[j].cluster = true;
          count += 1;

          if (j === marker.length - 1) {
            result.push({
              id: marker[i].id,
              cluster: false,
              lat: marker[i].lat,
              lng: marker[i].lng,
              number: count,
              cleaned: marker[i].cleaned,
            });
          }
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

    setOriginalLocations(result);
  }

  function paintFeedsInfo() {
    return originalLocations.map((feed) => {
      const { id, lng, lat, cleaned } = feed;
      const iconType = cleaned ? "leaf" : "trashCanFill";
      const color = cleaned ? theme.colors.green_1 : theme.colors.red;

      return <StyledIcon key={id} lat={lat} lng={lng} icon={iconType} color={color} size="sm" />;
    });
  }

  function paintCluster() {
    const result = [...cleanClusterLocations, ...dirtClusterLocations];

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
        alert("please accept your location.");
      },
    );
  }, []);

  useEffect(() => {
    async function getFeedLocation() {
      const result = await getFeedInfo(boundary);
      convertToClusterFormat(result);
    }

    if (Object.keys(boundary).length) {
      getFeedLocation();
    }
  }, [zoomLevel, boundary]);

  useEffect(() => {
    if (zoomLevel < 17) {
      const clean = calcCleanCluster(originalLocations);
      const dirt = calcDirtCluster(originalLocations);

      setDirtClusterLocations(dirt);
      setCleanClusterLocations(clean);
    }
  }, [zoomLevel]);

  return (
    <MapTemplate>
      {loading ? <Loading /> : null}
      {defaultProps && (
        <GoogleMapReact
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
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
          {zoomLevel < 17 ? paintCluster() : paintFeedsInfo()}
        </GoogleMapReact>
      )}
    </MapTemplate>
  );
}

export default MapClusteringPage;
