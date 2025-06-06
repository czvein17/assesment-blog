import React, { useEffect, useState } from "react";

import { Loading } from "../Loading";

interface BlogForm {
  isCreateNew?: boolean;
  onCancel: () => void;
  onSubmit: (blog: {
    title: string;
    content: string;
    user_id: string;
  }) => Promise<void>;
  initialBlog?: { title: string; content: string; user_id: string };

  loading?: boolean;
}

export const BlogForm: React.FC<BlogForm> = ({
  isCreateNew = false,
  onCancel,
  onSubmit,
  initialBlog,
  loading = false,
}) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    user_id: "",
  });

  useEffect(() => {
    if (initialBlog) setBlog(initialBlog);
  }, [initialBlog]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(blog);
  };

  return (
    <form
      className="card w-full bg-base-100 card-md shadow-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-3xl uppercase font-bold my-5">
        {isCreateNew ? "Create a New Blog" : "Edit Blog"}
      </h1>
      <div className="card-body">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-xl">Title:</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-xl">Content:</legend>
          <textarea
            className="textarea h-50 w-full"
            placeholder="Type here"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          ></textarea>
        </fieldset>

        <div className="justify-end card-actions">
          {loading ? (
            <Loading />
          ) : (
            <>
              <button className="btn" type="button" onClick={onCancel}>
                Cancel
              </button>
              <button
                className="btn btn-primary hover:text-white"
                type="submit"
              >
                {isCreateNew ? "Create" : "Update"}
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};
