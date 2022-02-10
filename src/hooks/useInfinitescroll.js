import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { throttle } from "lodash";

export default function useInfiniteScroll(callback, seconds = 500) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleThrottleScroll = throttle(() => {
      const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      const { clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
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
