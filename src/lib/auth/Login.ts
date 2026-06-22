import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch, tokenStorage } from "../../api/Api";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at?: string;
  phone?: string;
  country?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  default_destination?: string;
  high_risk_consent?: boolean;
  newsletter_subscribed?: boolean;
}

// Реальный ответ бэкенда на /api/login/ — содержит токены И user сразу
export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

// Под реальный API: PUT/PATCH /api/me/ — модель "UpdateProfile" в Swagger.
// ⚠️ Проверь точные имена полей в Swagger UI (Model "UpdateProfile"), я предположил
// набор по форме AccountProfile.tsx. Поправь при необходимости.
export type UpdateMePayload = Partial<{
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postal_code: string;
  default_destination: string;
  high_risk_consent: boolean;
  newsletter_subscribed: boolean;
}>;

// ─── State ────────────────────────────────────────────────────────────────────
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  meLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: tokenStorage.getAccess(),
  refreshToken: tokenStorage.getRefresh(),
  loading: false,
  meLoading: false,
  error: null,
  isAuthenticated: !!tokenStorage.getAccess(),
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

// Используется, если нужно перезагрузить/обновить данные профиля отдельно
// (например, после возврата на сайт спустя время, или для принудительного refetch).
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

// Полное обновление профиля (PUT) — заменяет все поля целиком
export const updateMeThunk = createAsyncThunk(
  "auth/updateMe",
  async (payload: UpdateMePayload, { rejectWithValue }) => {
    try {
      return await apiFetch<User>("/me/", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Частичное обновление (PATCH) — для сохранения одного поля по onBlur
export const patchMeThunk = createAsyncThunk(
  "auth/patchMe",
  async (payload: UpdateMePayload, { rejectWithValue }) => {
    try {
      return await apiFetch<User>("/me/", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
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
const loginSlice = createSlice({
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
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchMeThunk.pending, (state) => {
        state.meLoading = true;
      })
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.meLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.meLoading = false;
        state.isAuthenticated = false;
        tokenStorage.clear();
      });

    builder
      .addCase(updateMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateMeThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    builder
      .addCase(patchMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(patchMeThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearError, clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
