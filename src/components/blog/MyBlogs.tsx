import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useBlogs } from "../../hooks/useBlogs";
import type { NewBlog } from "../../types/BlogType";

import { Loading } from "../Loading";
import { BlogCard } from "./BlogCard";
import { BlogForm } from "./BlogForm";
import { Pagination } from "../Pagination";

export const MyBlogs = () => {
  const [postBlog, setPostBlog] = useState(false);
  const {
    user,
    blogs: UserBlogs,
    count,
    loading,
    handleFetchUserBlogs,
    handleCreateBlog,
  } = useBlogs();
  const { page, setPage, totalPages, pageSize } = usePagination(count);

  const onCreateBlog = async (newBlog: NewBlog) => {
    const success = await handleCreateBlog(newBlog, page, pageSize);
    if (success) setPostBlog(false);
  };

  useEffect(() => {
    if (user) handleFetchUserBlogs(user.id, page, pageSize);
  }, [handleFetchUserBlogs, user, page, pageSize]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">
          Please log in to view your blogs
        </h1>
        <p className="text-gray-500">
          You need to be logged in to create or view your blogs.
        </p>
      </div>
    );
  }

  return (
    <section className="w-4/6 flex-1 flex flex-col space-y-5 p-5">
      {postBlog ? (
        <BlogForm
          isCreateNew={true}
          onCancel={() => setPostBlog(!postBlog)}
          loading={loading}
          onSubmit={onCreateBlog}
        />
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold uppercase">My Blogs</h1>
          <button
            className="btn btn-primary ml-auto"
            onClick={() => setPostBlog(!postBlog)}
          >
            Create a Blog
          </button>

          {!loading && UserBlogs?.length === 0 && (
            <div className="text-center text-gray-500">
              No blogs found. Start writing your first blog!
            </div>
          )}

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch place-items-center">
                {UserBlogs?.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              <Pagination
                totalPages={totalPages}
                page={page}
                onClick={setPage}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};
