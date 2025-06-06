import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export const useBlogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { blogs, selectedBlog, count, loading } = useSelector(
    (state: RootState) => state.posts
  );

  console.log(loading);

  return { user, blogs, selectedBlog, count, loading, dispatch };
};
