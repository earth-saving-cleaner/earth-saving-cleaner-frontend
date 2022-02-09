import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useInfiniteScroll from "../../../hooks/useInfinitescroll";
import { feedSliceActions } from "../../../modules/slices/feedSlice";
import { MainTemplate } from "../../templates";

import { FeedCard } from "../../organisms";

function MainPage() {
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

  const handleLikeIconClick = (feedId) => {
    dispatch(feedSliceActions.addLikeUser({ feedId, userId }));
  };

  const sendToLogin = () => {
    history.push("/login");
  };

  const handleCommentIconClick = (feedId) => {
    alert("피드 상세 모달 open 준비중");
  };

  useEffect(() => {
    dispatch(feedSliceActions.getFeeds({ limit: 3 }));
  }, []);

  return (
    <MainTemplate>
      <>
        test
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
                onClickCommentIcon={handleCommentIconClick}
                isIconFilled={[...feed.like].includes(userId)}
              />
            );
          })}
      </>
    </MainTemplate>
  );
}

export default MainPage;
