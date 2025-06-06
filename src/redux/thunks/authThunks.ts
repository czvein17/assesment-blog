import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/client";
import type { Credentials } from "../../types/User";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: Credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    return data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }: Credentials) => {
    console.log("Registering user:", email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    if (error) throw error;

    return data;
  }
);
