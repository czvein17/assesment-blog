import { useEffect } from "react";

import { usePagination } from "../../hooks/usePagination";
import { useBlogs } from "../../hooks/useBlogs";

import { Loading } from "../Loading";
import { BlogCard } from "./BlogCard";
import { Pagination } from "../Pagination";

export const AllBlogs = () => {
  const { handleFetchAllBlogs, blogs, count, loading } = useBlogs();
  const { page, setPage, totalPages, pageSize } = usePagination(count);

  useEffect(() => {
    handleFetchAllBlogs(page, pageSize);
  }, [handleFetchAllBlogs, page, pageSize]);

  return (
    <section className="flex flex-col flex-1 xl:w-4/6 p-5">
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
    </section>
  );
};
