import React from "react";
import type { Blog } from "../../types/BlogType";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div key={blog.id} className="card w-96 bg-base-300 card-lg shadow-md">
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <p>
          {blog.content.length > 100
            ? `${blog.content.slice(0, 100)}...`
            : blog.content}
        </p>
        <div className="justify-end card-actions">
          <button
            className="btn btn-primary text-white "
            onClick={() => navigate(`/${blog.id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
