import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import EXIF from "exif-js";

import { Button, Img } from "../../atoms";
import { addPhotoToAWS } from "../../../api";
import theme from "../../../theme/theme";

const ButtonWrapper = styled(Button)`
  width: 15%;
  background: ${theme.colors.purple};
  color: ${theme.colors.white};
`;

function ImageUpload(props) {
  const [preViewImage, setPreViewImage] = useState("");
  const [resizedImageUrl, setResizedImageUrl] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const deleteFileImage = () => {
    setPreViewImage("");
    setResizedImageUrl("");
    // S3 통신 없이 화면 노출 테스트 할 경우 사용!
    // URL.revokeObjectURL(preViewImage);
  };

  const handleImageChange = useCallback(async (e) => {
    e.preventDefault();

    const imageFormData = new FormData();
    imageFormData.append("img", e.target.files[0]);

    try {
      const res = await addPhotoToAWS(imageFormData);
      // 실제 S3 response
      // originalUrl: "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/original/1644598340028KakaoTalk_Photo_2022-02-01-20-20-16.jpeg"
      // url: "https://earth-saving-cleaner.s3.ap-northeast-2.amazonaws.com/thumb/1644598340028KakaoTalk_Photo_2022-02-01-20-20-16.jpeg"

      if (res) {
        setPreViewImage(res.originalUrl);
        setResizedImageUrl(res.url);
        // S3 통신 없이 화면 노출 테스트 할 경우 사용!
        // setPreViewImage(URL.createObjectURL(e.target.files[0]));
      }
    } catch (err) {
      console.error(err);
    }

    EXIF.getData(e.target.files[0], function () {
      // 사진 속 모든 metadata 필요할 때 사용!
      // const allMetaData = EXIF.getAllTags(this);

      const exifLong = EXIF.getTag(this, "GPSLongitude");
      const exifLat = EXIF.getTag(this, "GPSLatitude");
      const exifLongRef = EXIF.getTag(this, "GPSLongitudeRef");
      const exifLatRef = EXIF.getTag(this, "GPSLatitudeRef");
      let convertedLatitude;
      let convertedLongitude;

      if (exifLatRef === "S") {
        convertedLatitude = exifLat[0] * -1 + (exifLat[1] * -60 + exifLat[2] * -1) / 3600;
        setLatitude(convertedLatitude);
      } else {
        convertedLatitude = exifLat[0] + (exifLat[1] * 60 + exifLat[2]) / 3600;
        setLatitude(convertedLatitude);
      }

      if (exifLongRef === "W") {
        convertedLongitude = exifLong[0] * -1 + (exifLong[1] * -60 + exifLong[2] * -1) / 3600;
        setLongitude(convertedLongitude);
      } else {
        convertedLongitude = exifLong[0] + (exifLong[1] * 60 + exifLong[2]) / 3600;
        setLongitude(convertedLongitude);
      }
    });
  }, []);

  useEffect(() => {
    const { getImage } = props;

    const imageDetail = {
      imageUrl: resizedImageUrl,
      locationFromMeta: [latitude, longitude],
    };

    if (resizedImageUrl) {
      getImage(imageDetail);
    }
  }, [resizedImageUrl, latitude, longitude]);

  return (
    <form>
      <div>
        {preViewImage && (
          <Img
            alt="enrolledPicture"
            src={preViewImage}
            style={{ display: "block", width: "60%", marginLeft: "2rem" }}
          />
        )}
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            name="imgUpload"
            type="file"
            accept="image/*"
            style={{ display: "block" }}
            onChange={handleImageChange}
          />
          {preViewImage && <ButtonWrapper type="button" title="Delete" onClick={() => deleteFileImage()} />}
        </div>
      </div>
    </form>
  );
}

ImageUpload.propTypes = {
  getImage: PropTypes.func.isRequired,
};

export default ImageUpload;
