import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/client";
import type { User } from "../types/User";
import { login, register } from "./thunks/authThunks";

const userFromLocalStorage = localStorage.getItem("user");
const saveUserToStorage = (user: User | null, accessToken?: string) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    if (accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
    }
  }
};

const removeUserFromStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

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
      removeUserFromStorage();
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
        saveUserToStorage(state.user, action.payload.session.access_token);
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
        saveUserToStorage(state.user, action.payload?.session?.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
