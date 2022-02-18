import { useState, useEffect } from "react";
import { throttle } from "lodash";
import PropTypes from "prop-types";

export default function useInfiniteScroll(callback, seconds = 200) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleThrottleScroll = throttle(() => {
      const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      const { clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        setIsFetching(true);
        callback();
      }
    }, seconds);

    window.addEventListener("scroll", handleThrottleScroll);

    return () => {
      window.removeEventListener("scroll", handleThrottleScroll);
    };
  }, [callback, seconds]);

  return [isFetching, setIsFetching];
}

useInfiniteScroll.propTypes = {
  callback: PropTypes.func.isRequired,
  seconds: PropTypes.number,
};
