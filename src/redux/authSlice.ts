import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabase/client";
import type { Credentials, User } from "../types/User";

const userFromLocalStorage = localStorage.getItem("user");

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

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
    loading: false,
    error: null,
  } as {
    user: User | null;
    loading: boolean;
    error: string | null;
  },
  reducers: {
    logout(state) {
      supabase.auth.signOut();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
          email: action.payload?.user.email || "",
        };
        state.loading = false;

        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.session.access_token)
        );

        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })

      .addCase(register.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
          email: action.payload?.user?.email || "",
          id: action.payload?.user?.id || "",
          created_at: action.payload?.user?.created_at || "",
        };
        state.loading = false;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload?.session?.access_token || "")
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
