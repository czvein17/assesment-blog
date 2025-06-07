import type { Blog } from "../types/BlogType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  fetchUserBlogs,
  fetchBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
} from "./thunks/blogThunks";

interface BlogSliceState {
  blogs: Blog[];
  selectedBlog?: Blog | null;
  loading: boolean;
  count: number;
  page: number;
}

// Helpers
const setLoading = (state: BlogSliceState, loading: boolean) => {
  state.loading = loading;
};

const setBlogsAndCount = (
  state: BlogSliceState,
  action: PayloadAction<{ data: Blog[] | null; count: number | null }>
) => {
  state.blogs = action.payload.data ?? [];
  state.count = action.payload.count ?? 0;
  state.loading = false;
};

// SLICES
const BlogSlice = createSlice({
  name: "posts",
  initialState: { blogs: [], loading: true, count: 0, page: 1 } as {
    blogs: Blog[];
    selectedBlog?: Blog | null;
    loading: boolean;
    count: number;
    page: number;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => setLoading(state, true))
      .addCase(fetchBlogs.fulfilled, setBlogsAndCount)

      // Fetch user blogs
      .addCase(fetchUserBlogs.pending, (state) => setLoading(state, true))
      .addCase(fetchUserBlogs.fulfilled, setBlogsAndCount)

      .addCase(fetchBlogById.pending, (state) => setLoading(state, true))
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload ?? null;
        state.loading = false;
      })

      .addCase(addBlog.pending, (state) => setLoading(state, true))
      .addCase(addBlog.fulfilled, (state, action) => {
        if (action.payload) state.blogs.unshift(action.payload);
        state.loading = false;
      })

      .addCase(updateBlog.pending, (state) => setLoading(state, true))
      .addCase(updateBlog.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return void (state.loading = false);
        const index = state.blogs.findIndex((blog) => blog.id === updated.id);
        if (index !== -1) state.blogs[index] = updated;
        state.loading = false;
      })

      .addCase(deleteBlog.pending, (state) => setLoading(state, true))
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        state.loading = false;
      });
  },
});

export default BlogSlice.reducer;
