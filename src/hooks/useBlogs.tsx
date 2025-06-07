import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useCallback } from "react";
import type { NewBlog } from "../types/BlogType";
import {
  addBlog,
  deleteBlog,
  fetchBlogById,
  fetchBlogs,
  fetchUserBlogs,
  updateBlog,
} from "../redux/thunks/blogThunks";

export const useBlogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { blogs, selectedBlog, count, loading } = useSelector(
    (state: RootState) => state.posts
  );

  const handleFetchAllBlogs = useCallback(
    async (page: number, pageSize: number) => {
      return await dispatch(fetchBlogs({ page, pageSize }));
    },
    [dispatch]
  );

  const handleFetchBlogById = useCallback(
    async (id: string) => await dispatch(fetchBlogById(id)),
    [dispatch]
  );

  const handleFetchUserBlogs = useCallback(
    async (userId: string, page: number, pageSize: number) => {
      return await dispatch(fetchUserBlogs({ userId, page, pageSize }));
    },
    [dispatch]
  );

  const handleCreateBlog = useCallback(
    async (newBlog: NewBlog, page: number, pageSize: number) => {
      if (!user) return;

      const result = await dispatch(
        addBlog({
          ...newBlog,
          user_id: user.id,
        })
      );

      if (addBlog.fulfilled.match(result)) {
        dispatch(fetchUserBlogs({ userId: user.id, page, pageSize }));
        return true;
      }
      return false;
    },
    [dispatch, user]
  );

  const handleUpdateBlog = useCallback(
    async (updatedFields: NewBlog) => {
      if (!selectedBlog) return;

      const result = await dispatch(
        updateBlog({
          ...selectedBlog,
          ...updatedFields,
        })
      );

      if (updateBlog.fulfilled.match(result)) {
        dispatch(fetchBlogById(result.payload.id));
        return true;
      }

      return false;
    },
    [dispatch, selectedBlog]
  );

  const handleDeleteBlog = useCallback(
    async (blogId: string) => {
      if (!user) return;

      const result = await dispatch(deleteBlog(blogId));

      if (deleteBlog.fulfilled.match(result)) {
        dispatch(fetchUserBlogs({ userId: user.id, page: 1, pageSize: 3 }));
        return true;
      }
      return false;
    },
    [dispatch, user]
  );

  return {
    user,
    blogs,
    selectedBlog,
    count,
    loading,
    handleFetchAllBlogs,
    handleFetchBlogById,
    handleFetchUserBlogs,
    handleCreateBlog,
    handleUpdateBlog,
    handleDeleteBlog,
  };
};
