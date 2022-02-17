import React from "react";
import PropTypes from "prop-types";

import { RankingItem } from "../../molecules";

function RankingList({ rank }) {
  return rank.map((user, index) => {
    const { profileImage, nickname, level, score } = user;
    return (
      <RankingItem
        key={nickname}
        profileImage={profileImage}
        nickname={nickname}
        level={level}
        score={score}
        index={index + 1}
      />
    );
  });
}

RankingList.propTypes = {
  rank: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RankingList;
