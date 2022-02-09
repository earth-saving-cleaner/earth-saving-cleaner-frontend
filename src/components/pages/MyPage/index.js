import React from "react";

import styled from "styled-components";

import { Text } from "../../atoms";
import { RankingList, UserInfo } from "../../organisms";
import { MyPageGrid } from "../../templates";

const user = {
  nickname: "user1",
  profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
  level: 10,
  score: 5,
};

const rankingList = [
  {
    _id: {
      $oid: "61fe405e1a04b2694da83265",
    },
    email: "user1@gmail.com",
    nickname: "user1",
    profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
    level: 10,
    score: 5,
  },
  {
    _id: {
      $oid: "61fe405e1a04b2694da83266",
    },
    email: "user2@gmail.com",
    nickname: "user2",
    profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
    level: 15,
    score: 50,
  },
  {
    _id: {
      $oid: "61fe3f53a5010f7ed7e75f4d",
    },
    eamil: "abc@gmail.com",
    nickname: "abc",
    profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
    level: 1,
    score: 0,
  },
  {
    _id: {
      $oid: "61fe408ca5010f7ed7e75f4f",
    },
    eamil: "tdd@gmail.com",
    nickname: "tdd",
    profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
    level: 1,
    score: 0,
  },
  {
    _id: {
      $oid: "61fe40b4a5010f7ed7e75f50",
    },
    eamil: "oop@gmail.com",
    nickname: "oop",
    profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
    level: 1,
    score: 0,
  },
  {
    _id: {
      $oid: "61fe414952ae6d99d2794180",
    },
    email: "ramieta16@gmail.com",
    nickname: "JK",
    profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
    level: 10,
    score: 5,
  },
  {
    _id: {
      $oid: "61fe414952ae6d99d2794181",
    },
    email: "yunjwtest01@gmail.com",
    nickname: "Woo",
    profileImage: "https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c",
    level: 10,
    score: 5,
  },
];

const StyledText = styled(Text)`
  color: ${(props) => props.theme.colors.purple};
`;

function MyPage() {
  const { profileImage, nickname, level, score } = user;
  return (
    <MyPageGrid
      leftSide={<UserInfo profileImage={profileImage} nickname={nickname} level={level} score={score} />}
      rightSide={<RankingList rank={rankingList} />}
      rightSideTitle={<StyledText size="xxxl" text="Ranking" />}
    />
  );
}

export default MyPage;
