import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch, tokenStorage } from "../../api/Api";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

// Под реальный API: POST /api/register/
export interface RegisterPayload {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  password2: string;
}

export interface RegisterResponse {
  detail: string; // "Код подтверждения отправлен на ..."
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
  };
}

// Под реальный API: POST /api/verify-email/
export interface VerifyEmailPayload {
  email: string;
  code: string; // ⚠️ Проверь точное имя поля в реальной схеме Swagger (может быть "token" или "otp")
}

export interface VerifyEmailResponse {
  detail: string;
}

// Под реальный API: POST /api/resend-otp/
export interface ResendOtpPayload {
  email: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

// ─── State ────────────────────────────────────────────────────────────────────
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  // ── для флоу регистрации с подтверждением email ──
  registeredEmail: string | null; // email, который нужно подтвердить
  registrationSuccess: boolean; // флаг успешной финальной верификации
}

const initialState: AuthState = {
  user: null,
  accessToken: tokenStorage.getAccess(),
  refreshToken: tokenStorage.getRefresh(),
  loading: false,
  error: null,
  isAuthenticated: !!tokenStorage.getAccess(),
  registeredEmail: null,
  registrationSuccess: false,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const data = await apiFetch<LoginResponse>(
        "/login/",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        false,
      );
      tokenStorage.setTokens(data.access, data.refresh);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      return await apiFetch<RegisterResponse>(
        "/register/",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        false,
      );
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const verifyEmailThunk = createAsyncThunk(
  "auth/verifyEmail",
  async (payload: VerifyEmailPayload, { rejectWithValue }) => {
    try {
      return await apiFetch<VerifyEmailResponse>(
        "/verify-email/",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        false,
      );
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async (payload: ResendOtpPayload, { rejectWithValue }) => {
    try {
      return await apiFetch<{ detail: string }>(
        "/resend-otp/",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        false,
      );
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchMeThunk = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      return await apiFetch<User>("/me/");
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      await apiFetch("/logout/", { method: "POST" });
    } catch {
      // чистим локально в любом случае
    } finally {
      tokenStorage.clear();
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      tokenStorage.clear();
    },
    resetRegistrationState(state) {
      state.registeredEmail = null;
      state.registrationSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredEmail = action.payload.user.email;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(verifyEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailThunk.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(resendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.isAuthenticated = false;
        tokenStorage.clear();
      });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearError, clearAuth, resetRegistrationState } =
  authSlice.actions;
export default authSlice.reducer;
