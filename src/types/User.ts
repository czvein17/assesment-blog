export type Credentials = {
  name?: string;
  email: string;
  password: string;
  cfmPassword?: string;
};

export type User = {
  id: string;
  email: string;
  created_at: string;
};
