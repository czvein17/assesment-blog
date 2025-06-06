import { useEffect, useState } from "react";
import { addBlog, fetchUserBlogs } from "../../redux/thunks/blogThunks";
import { BlogCard } from "./BlogCard";
import { Pagination } from "../Pagination";
import { usePagination } from "../../hooks/usePagination";
import { Loading } from "../Loading";
import { BlogForm } from "./BlogForm";
import { useBlogs } from "../../hooks/useBlogs";
import type { NewBlog } from "../../types/BlogType";

export const MyBlogs = () => {
  const [postBlog, setPostBlog] = useState(false);
  const { dispatch, user, blogs: UserBlogs, count, loading } = useBlogs();

  const pageSize = 3;
  const { page, setPage, totalPages } = usePagination(count, pageSize);

  const handleCreateBlog = async (newBlog: NewBlog) => {
    const result = await dispatch(
      addBlog({
        ...newBlog,
        user_id: user?.id || "",
      })
    );

    if (addBlog.fulfilled.match(result)) {
      setPostBlog(false);
      dispatch(fetchUserBlogs({ userId: user!.id, page, pageSize }));
    }
  };

  useEffect(() => {
    if (user) dispatch(fetchUserBlogs({ userId: user.id, page, pageSize }));
  }, [dispatch, user, page]);

  return (
    <section className="w-4/6 flex-1 flex flex-col space-y-5 p-5">
      {postBlog ? (
        <BlogForm
          isCreateNew={true}
          onCancel={() => setPostBlog(!postBlog)}
          loading={loading}
          onSubmit={handleCreateBlog}
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
