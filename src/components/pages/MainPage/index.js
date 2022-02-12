import React, { useEffect, useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import useInfiniteScroll from "../../../hooks/useInfinitescroll";
import { feedSliceActions } from "../../../modules/slices/feedSlice";
import { getFeed, addComment } from "../../../api";

import { MainTemplate, Modal, CommentTemplate } from "../../templates";
import { FeedCard } from "../../organisms";
import { Text } from "../../atoms";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MainPage() {
  const [modal, setModal] = useState(false);
  const [feedInfo, setFeedInfo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState(null);
  const [id, setId] = useState(null); // feed id
  const userId = "61fe408ca5010f7ed7e75f4f";
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, feeds, error } = useSelector((state) => state.feed);

  const fetchDataOnScroll = useCallback(async () => {
    try {
      dispatch(feedSliceActions.addFeeds({ limit: 3, id: feeds?.lastId }));
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsFetching(false);
    }
  }, [feeds]);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchDataOnScroll);

  const findUserLike = () => {
    for (let i = 0; i < feeds.length; i += 1) {
      if (feeds[i]._id === id) {
        return feeds[i].like.includes(userId);
      }
    }

    return false;
  };

  const handleLikeIconClick = (feedId) => {
    dispatch(feedSliceActions.addLikeUser({ feedId, userId }));
  };

  const sendToLogin = () => {
    history.push("/login");
  };

  const handleCommentIconClick = (feedId) => {
    setId(feedId);
    setModal(true);
  };

  const handleCommentButtonClick = async () => {
    if (!commentText) return;

    const commentInfo = {
      userId,
      commentText,
      id,
    };

    const { comment } = await addComment(commentInfo);
    const { _id } = comment[comment.length - 1];

    dispatch(feedSliceActions.addComment({ commentId: _id, feedId: id }));

    setCommentText("");
    setCommentList(comment);
  };

  const handleCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const handleCloseButton = () => {
    setFeedInfo(null);
    setCommentList(null);
    setModal(false);
  };

  useEffect(() => {
    const fetchFeed = async () => {
      const { author, comment, content, image, like, location } = await getFeed(id);

      setFeedInfo({
        author,
        content,
        like,
        image: image[0],
      });
      setCommentList(comment);
    };

    if (modal) {
      fetchFeed();
    }
  }, [modal, id]);

  useEffect(() => {
    dispatch(feedSliceActions.getFeeds({ limit: 3 }));
  }, []);

  return (
    <MainTemplate>
      <StyledContainer>
        {isLoading && <Text>Loding...</Text>}
        {feeds &&
          feeds?.data.map((feed) => {
            const { _id, author, content, comment, image, like, location } = feed;
            return (
              <FeedCard
                key={_id}
                feedId={_id}
                nickname={author?.nickname}
                avatarUrl={author?.profileImage}
                imageUrl={image[0]}
                comment={comment.length}
                like={like.length}
                content={content}
                location={location}
                onClickLikeIcon={userId ? handleLikeIconClick : sendToLogin}
                onClickCommentIcon={() => handleCommentIconClick(_id)}
                isIconFilled={[...feed.like].includes(userId)}
              />
            );
          })}
        {modal && feedInfo && (
          <Modal handleClose={handleCloseButton}>
            <CommentTemplate
              comments={commentList}
              author={feedInfo.author}
              content={feedInfo.content}
              image={feedInfo.image}
              onClickCommentButton={userId ? handleCommentButtonClick : sendToLogin}
              onChangeText={handleCommentText}
              onClickLikeIcon={userId ? handleLikeIconClick : sendToLogin}
              isIconFilled={findUserLike}
              text={commentText}
              like={feedInfo.like.length}
            />
          </Modal>
        )}
        {error && <Text>Failed to load feed. Please contact the administrator.</Text>}
      </StyledContainer>
    </MainTemplate>
  );
}

export default MainPage;
