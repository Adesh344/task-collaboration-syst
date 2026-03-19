import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTaskAPI, getTasksAPI, updateTaskAPI,
  deleteTaskAPI, getAnalyticsAPI,
} from "../services/taskService";

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const res = await getTasksAPI(params);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
  }
});

export const createTask = createAsyncThunk("tasks/create", async (data, { rejectWithValue }) => {
  try {
    const res = await createTaskAPI(data);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create task");
  }
});

export const updateTask = createAsyncThunk("tasks/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await updateTaskAPI(id, data);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to update task");
  }
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id, { rejectWithValue }) => {
  try {
    await deleteTaskAPI(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete task");
  }
});

export const fetchAnalytics = createAsyncThunk("tasks/analytics", async (_, { rejectWithValue }) => {
  try {
    const res = await getAnalyticsAPI();
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch analytics");
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    analytics: null,
    loading: false,
    error: null,
  },
  reducers: {
    socketTaskCreated: (state, action) => {
      const exists = state.tasks.find((t) => t._id === action.payload._id);
      if (!exists) state.tasks.unshift(action.payload);
    },
    socketTaskUpdated: (state, action) => {
      const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
      if (idx !== -1) state.tasks[idx] = action.payload;
    },
    socketTaskDeleted: (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload.id);
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        state.pagination.total -= 1;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { socketTaskCreated, socketTaskUpdated, socketTaskDeleted, clearError } = taskSlice.actions;
export default taskSlice.reducer;