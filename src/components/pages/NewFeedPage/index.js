import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { FeedModal } from "../../templates";
import { NewFeed } from "../../organisms";

function NewFeedPage() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(true);

  const handleModalClose = () => {
    setIsOpen(false);
    history.push("/");
  };

  if (!isOpen) return null;

  return (
    <FeedModal>
      <NewFeed handleClose={handleModalClose} />
    </FeedModal>
  );
}

export default NewFeedPage;
