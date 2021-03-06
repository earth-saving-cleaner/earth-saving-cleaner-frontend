import React, { useEffect, useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { getFeed, addComment } from "../../../api";
import { PAGING_LIMIT } from "../../../constants";
import useInfiniteScroll from "../../../hooks/useInfinitescroll";
import { feedSliceActions } from "../../../modules/slices/feedSlice";
import { isTokenExpired } from "../../../utils";
import { Text } from "../../atoms";
import { FeedCard } from "../../organisms";
import { CommentTemplate, NewFeedModalTemplate } from "../../templates";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MainPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, feeds, error } = useSelector((state) => state.feed);
  const { data } = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [feedInfo, setFeedInfo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [id, setId] = useState(null);

  const userId = data?.id;
  const token = data?.token;

  const fetchDataOnScroll = useCallback(async () => {
    try {
      if (feeds.total > feeds.data.length) {
        dispatch(feedSliceActions.addFeeds({ limit: PAGING_LIMIT, id: feeds?.lastId }));
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsFetching(false);
    }
  }, [feeds]);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchDataOnScroll);

  const findUserLike = () => {
    const currentFeed = feeds.data.find((feed) => feed._id === id);
    return currentFeed.like.includes(userId);
  };

  const findFeedLike = () => {
    const currentFeed = feeds.data.find((feed) => feed._id === id);
    return currentFeed.like.length;
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
    const tokenVerifiedResult = await isTokenExpired(result);

    if (tokenVerifiedResult || result === "Request failed with status code 401") {
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

  useEffect(() => {
    const fetchFeed = async () => {
      const { author, comment, content, image, address } = await getFeed(id);

      setFeedInfo({
        author,
        content,
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
    dispatch(feedSliceActions.getFeeds({ limit: PAGING_LIMIT }));
  }, []);

  return (
    <>
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
      {modal && feedInfo && (
        <NewFeedModalTemplate>
          <CommentTemplate
            comments={commentList}
            author={feedInfo.author}
            content={feedInfo.content}
            image={feedInfo.image}
            onCloseClick={setModal}
            onClickCommentButton={userId ? handleCommentButtonClick : sendToLogin}
            onChangeText={handleCommentText}
            onClickLikeIcon={userId ? handleCommentLikeIconClick : sendToLogin}
            isIconFilled={findUserLike()}
            text={commentText}
            like={findFeedLike()}
          />
        </NewFeedModalTemplate>
      )}
    </>
  );
}

export default MainPage;
