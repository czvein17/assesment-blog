import { useEffect } from "react";

import { BlogCard } from "./BlogCard";
import { fetchBlogs } from "../../redux/blogSlice";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../Pagination";
import { Loading } from "../Loading";
import { useBlogs } from "../../hooks/useBlogs";

export const AllBlogs = () => {
  const { dispatch, blogs, count, loading } = useBlogs();
  const pageSize = 3;
  const { page, setPage, totalPages } = usePagination(count, pageSize);

  useEffect(() => {
    dispatch(fetchBlogs({ page, pageSize }));
  }, [dispatch, page]);

  return (
    <div className="flex flex-col flex-1 xl:w-4/6 p-5">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch place-items-center">
          {blogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} page={page} onClick={setPage} />
    </div>
  );
};
