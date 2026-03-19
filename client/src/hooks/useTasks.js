import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, createTask, updateTask, deleteTask } from "../state/taskSlice";

const useTasks = () => {
  const dispatch = useDispatch();
  const { tasks, pagination, loading, error, analytics } = useSelector((s) => s.tasks);

  return {
    tasks, pagination, loading, error, analytics,
    fetchTasks: (params) => dispatch(fetchTasks(params)),
    createTask: (data) => dispatch(createTask(data)),
    updateTask: (id, data) => dispatch(updateTask({ id, data })),
    deleteTask: (id) => dispatch(deleteTask(id)),
  };
};

export default useTasks;