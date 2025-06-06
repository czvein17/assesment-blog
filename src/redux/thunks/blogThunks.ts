import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/client";
import type { Blog, NewBlog } from "../../types/BlogType";

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
