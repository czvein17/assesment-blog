export type Blog = {
  id?: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  raw_user_meta_data: {
    name: string;
    email: string;
    avatar_url: string;
  };
};

export type NewBlog = Omit<Blog, "id" | "created_at" | "raw_user_meta_data">;
