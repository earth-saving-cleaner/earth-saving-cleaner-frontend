import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { noop } from "lodash";

import { Icon, Text, Img } from "../../atoms";
import { FeedHeader } from "../../molecules";

const Container = styled.div`
  max-width: 60rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray_2};
  background: ${({ theme }) => theme.colors.white};
`;

const StatusWrapper = styled.div`
  display: flex;
  min-height: 4rem;
`;

const IconWrapper = styled.div`
  display: flex;
  min-width: 7rem;
  justify-content: space-evenly;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  min-width: 18rem;
  justify-content: space-evenly;
  align-items: center;
`;

const DescriptionWrapper = styled.div`
  padding: 1rem;
`;

function FeedCard({ ...props }) {
  const { feedId, isIconFilled } = props;

  return (
    <Container>
      <FeedHeader
        url={props.avatarUrl}
        nickname={props.nickname}
        address="Ardyaloon, Western Australia 6725, Australia"
      />
      <Img src={props.imageUrl} alt="feed image" width="100%" />
      <StatusWrapper>
        <IconWrapper>
          <Icon
            icon={isIconFilled ? "likeFill" : "likeLine"}
            size="sm"
            onClickIcon={isIconFilled ? noop : props.onClickLikeIcon}
            param={feedId}
          />
          <Icon icon="comment" size="xs" onClickIcon={props.onClickCommentIcon} />
        </IconWrapper>
        <TextWrapper>
          <Text text={`${props.like} likes`} size="base" />
          <Text text={`${props.comment} comments`} size="base" />
        </TextWrapper>
      </StatusWrapper>
      <DescriptionWrapper>
        <Text text={props.content} size="base" />
      </DescriptionWrapper>
    </Container>
  );
}

FeedCard.propTypes = {
  feedId: PropTypes.string.isRequired,
  nickname: PropTypes.string,
  avatarUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  comment: PropTypes.number,
  like: PropTypes.number,
  content: PropTypes.string,
  onClickLikeIcon: PropTypes.func,
  onClickCommentIcon: PropTypes.func,
  isIconFilled: PropTypes.bool,
};

FeedCard.defaultProps = {
  nickname: "no name",
  avatarUrl: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
  imageUrl: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
  comment: "",
  like: 0,
  content: 0,
  onClickLikeIcon: noop,
  onClickCommentIcon: noop,
  isIconFilled: false,
};

export default FeedCard;
