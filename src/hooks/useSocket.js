import { useCallback } from "react";
import { io } from "socket.io-client";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const sockets = {};

export default function useSocket(workspace) {
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${serverUrl}/${workspace}`, {
      transports: ["websocket"],
    });
  }

  return [sockets[workspace], disconnect];
}
