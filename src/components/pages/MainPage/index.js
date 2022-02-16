import React, { useEffect, useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import useInfiniteScroll from "../../../hooks/useInfinitescroll";
import { feedSliceActions } from "../../../modules/slices/feedSlice";
import { getFeed, addComment } from "../../../api";
import { isTokenExpired } from "../../../utils";

import { MainTemplate, Modal, CommentTemplate, NewFeedModal } from "../../templates";
import { FeedCard, NewFeed } from "../../organisms";
import { Text } from "../../atoms";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MainPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [feedInfo, setFeedInfo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, feeds, error } = useSelector((state) => state.feed);
  const { data } = useSelector((state) => state.user);
  const userId = data?.id;
  const token = data?.token;

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

  const handleCommentLikeIconClick = () => {
    dispatch(feedSliceActions.addLikeUser({ feedId: id, userId }));
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
      token,
    };

    const result = await addComment(commentInfo);
    const tokenVerifedResult = await isTokenExpired(result);

    if (tokenVerifedResult) {
      sendToLogin();
      return;
    }

    const { comment } = result;
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

  const handleModalOpen = () => {
    if (token) {
      setIsCreateModalOpen(true);
      return;
    }

    history.push("/login");
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    const fetchFeed = async () => {
      const { author, comment, content, image, like, address } = await getFeed(id);

      setFeedInfo({
        author,
        content,
        like,
        image: image[0],
        address,
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
    <>
      <MainTemplate onClickCreate={handleModalOpen} onClickModalClose={handleModalClose}>
        <StyledContainer>
          {isLoading && <Text text="Loding..." />}
          {feeds &&
            feeds?.data.map((feed) => {
              const { _id, author, content, comment, image, like, address } = feed;

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
                  location={address}
                  onClickLikeIcon={userId ? handleLikeIconClick : sendToLogin}
                  onClickCommentIcon={() => handleCommentIconClick(_id)}
                  isIconFilled={[...feed.like].includes(userId)}
                />
              );
            })}
          {error && <Text>Failed to load feed. Please contact the administrator.</Text>}
        </StyledContainer>
      </MainTemplate>
      {modal && feedInfo && (
        <Modal handleClose={handleCloseButton}>
          <CommentTemplate
            comments={commentList}
            author={feedInfo.author}
            content={feedInfo.content}
            image={feedInfo.image}
            onClickCommentButton={userId ? handleCommentButtonClick : sendToLogin}
            onChangeText={handleCommentText}
            onClickLikeIcon={userId ? handleCommentLikeIconClick : sendToLogin}
            isIconFilled={findUserLike()}
            text={commentText}
            like={feedInfo.like.length}
          />
        </Modal>
      )}
      {isCreateModalOpen && token && (
        <NewFeedModal>
          <NewFeed onClickModalOpen={handleModalOpen} onClickModalClose={handleModalClose} />
        </NewFeedModal>
      )}
    </>
  );
}

export default MainPage;
