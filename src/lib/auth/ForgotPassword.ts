import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../api/Api";

// ─── Types ────────────────────────────────────────────────────────────────────

// POST /api/password-reset/request/
export interface RequestResetPayload {
  email: string;
}

export interface RequestResetResponse {
  detail: string; // "Если аккаунт с адресом ... существует, код был отправлен."
}

// POST /api/password-reset/verify/
export interface VerifyResetPayload {
  email: string;
  code: string;
}

export interface VerifyResetResponse {
  detail: string; // "Код верный. Используйте reset_token для смены пароля."
  reset_token: string;
}

// POST /api/password-reset/confirm/
export interface ConfirmResetPayload {
  email: string;
  token: string;
  new_password: string;
  new_password2: string;
}

export interface ConfirmResetResponse {
  detail: string; // "Пароль успешно изменён. Войдите с новым паролем."
}

// ─── State ────────────────────────────────────────────────────────────────────
interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
  email: string | null;
  resetToken: string | null;
  codeSent: boolean;
  codeVerified: boolean;
  resetSuccess: boolean;
}

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  email: null,
  resetToken: null,
  codeSent: false,
  codeVerified: false,
  resetSuccess: false,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

// Шаг 1: запрос кода на email
export const requestResetThunk = createAsyncThunk(
  "forgotPassword/request",
  async (payload: RequestResetPayload, { rejectWithValue }) => {
    try {
      return await apiFetch<RequestResetResponse>(
        "/password-reset/request/",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        false, // без авторизации — пользователь не залогинен
      );
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Шаг 2: проверка кода, получение reset_token
export const verifyResetThunk = createAsyncThunk(
  "forgotPassword/verify",
  async (payload: VerifyResetPayload, { rejectWithValue }) => {
    try {
      return await apiFetch<VerifyResetResponse>(
        "/password-reset/verify/",
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

// Шаг 3: установка нового пароля по reset_token
export const confirmResetThunk = createAsyncThunk(
  "forgotPassword/confirm",
  async (payload: ConfirmResetPayload, { rejectWithValue }) => {
    try {
      return await apiFetch<ConfirmResetResponse>(
        "/password-reset/confirm/",
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

// ─── Slice ────────────────────────────────────────────────────────────────────
const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    clearForgotPasswordError(state) {
      state.error = null;
    },
    resetForgotPasswordState(state) {
      state.email = null;
      state.resetToken = null;
      state.codeSent = false;
      state.codeVerified = false;
      state.resetSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestResetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestResetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.codeSent = true;
        // email сохраняем из аргумента thunk'а, а не из ответа (ответ его не возвращает)
        state.email = action.meta.arg.email;
      })
      .addCase(requestResetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(verifyResetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.codeVerified = true;
        state.resetToken = action.payload.reset_token;
      })
      .addCase(verifyResetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(confirmResetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmResetThunk.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(confirmResetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearForgotPasswordError, resetForgotPasswordState } =
  forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
