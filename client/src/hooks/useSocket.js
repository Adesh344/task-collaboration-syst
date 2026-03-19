import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { socketTaskCreated, socketTaskUpdated, socketTaskDeleted } from "../state/taskSlice";
import toast from "react-hot-toast";

let socket;

const useSocket = (enabled = true) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) return;

    socket = io(import.meta.env.VITE_SOCKET_URL, { transports: ["websocket"] });

    socket.on("task:created", (task) => {
      dispatch(socketTaskCreated(task));
      toast.success(`New task created: "${task.title}"`);
    });

    socket.on("task:updated", (task) => {
      dispatch(socketTaskUpdated(task));
      toast(`Task updated: "${task.title}"`, { icon: "✏️" });
    });

    socket.on("task:deleted", (data) => {
      dispatch(socketTaskDeleted(data));
      toast(`A task was deleted`, { icon: "🗑️" });
    });

    return () => { socket?.disconnect(); };
  }, [enabled]);
};

export default useSocket;