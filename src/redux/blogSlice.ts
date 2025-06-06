import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabase/client";
import type { Blog, NewBlog } from "../types/BlogType";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ page = 1, pageSize = 6 }: { page: number; pageSize: number }) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    return { data, count };
  }
);

export const fetchUserBlogs = createAsyncThunk(
  "blogs/fetchUserBlogs",
  async ({
    userId,
    page = 1,
    pageSize = 6,
  }: {
    userId: string;
    page: number;
    pageSize: number;
  }) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    return { data, count };
  }
);

export const fetchBlogById = createAsyncThunk<Blog | null, string>(
  "blogs/fetchBlogById",
  async (id: string) => {
    const { data } = await supabase
      .from("blogs_with_user")
      .select("*")
      .eq("id", id)
      .single();

    return data;
  }
);

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async ({ title, content, user_id }: NewBlog) => {
    const { data } = await supabase
      .from("blogs")
      .insert({
        title,
        content,
        user_id,
      })
      .select();

    return data ? data[0] : null;
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, title, content }: Blog) => {
    const { data } = await supabase
      .from("blogs")
      .update({ title, content })
      .eq("id", id)
      .select();

    return data ? data[0] : null;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id: string) => {
    await supabase.from("blogs").delete().eq("id", id);

    return id;
  }
);

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
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload.data ?? [];
        state.count = action.payload.count ?? 0;
        state.loading = false;
      })

      .addCase(fetchUserBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload.data ?? [];
        state.count = action.payload.count ?? 0;
        state.loading = false;
      })

      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload ?? null;
        state.loading = false;
      })

      .addCase(addBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
        state.loading = false;
      })

      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (blog) => blog.id === action.payload?.id
        );
        state.blogs[index] = action.payload;
        state.loading = false;
      })

      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        state.loading = false;
      });
  },
});

export default BlogSlice.reducer;
