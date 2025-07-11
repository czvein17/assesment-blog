import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { NewBlog } from "../../types/BlogType";
import { useBlogs } from "../../hooks/useBlogs";

import { Loading } from "../Loading";
import { BlogForm } from "./BlogForm";

export const BlogView = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams<{ id: string }>();
  const {
    selectedBlog: blog,
    loading,
    user,
    handleFetchBlogById,
    handleUpdateBlog,
    handleDeleteBlog,
  } = useBlogs();

  useEffect(() => {
    if (id) handleFetchBlogById(id);
  }, [id, handleFetchBlogById]);

  const updateBlog = async (updatedFields: NewBlog) => {
    if (!blog) return;

    const success = await handleUpdateBlog(updatedFields);
    if (success) setIsEditing(false);
  };

  const deleteBlog = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    const success = await handleDeleteBlog(id!);
    if (success) navigate("/");
  };

  if (loading) return <Loading />;
  if (!blog) {
    return (
      <div className="w-4/6 flex-1 place-items-center flex flex-col space-y-5 p-5">
        <h1 className="text-center text-xl font-bold uppercase">
          Blog not found
        </h1>
      </div>
    );
  }

  return (
    <section className="w-4/6 flex-1 place-items-center flex flex-col space-y-5 p-5 ">
      {isEditing ? (
        <BlogForm
          isCreateNew={false}
          initialBlog={
            blog
              ? {
                  title: blog.title,
                  content: blog.content,
                  user_id: blog.user_id,
                }
              : undefined
          }
          onSubmit={updateBlog}
          onCancel={() => setIsEditing(!isEditing)}
        />
      ) : (
        <div className="w-4/5  relative">
          <button
            className="absolute text-xl font-bold left-4 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            {"<"} Back
          </button>

          <h1 className="text-center text-2xl font-bold uppercase">
            {blog?.title}
          </h1>

          <div className="text-white p-5  space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm mt-2">
                Posted by {blog?.raw_user_meta_data.name} on{" "}
                {blog?.created_at
                  ? new Date(blog.created_at).toLocaleDateString()
                  : ""}
              </p>

              {user?.id === blog?.user_id && (
                <div className="flex gap-2">
                  <button
                    className="btn shadow-xl"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary shadow-xl"
                    onClick={deleteBlog}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="tracking-widest">{blog?.content}</p>
          </div>
        </div>
      )}
    </section>
  );
};
