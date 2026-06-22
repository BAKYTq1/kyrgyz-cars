import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../api/Api";

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── State ────────────────────────────────────────────────────────────────────
interface RegisterState {
  loading: boolean;
  error: string | null;
  registeredEmail: string | null; // email, который нужно подтвердить
  registrationSuccess: boolean; // флаг успешной финальной верификации
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  registeredEmail: null,
  registrationSuccess: false,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────
export const registerThunk = createAsyncThunk(
  "register/register",
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
  "register/verifyEmail",
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
  "register/resendOtp",
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

// ─── Slice ────────────────────────────────────────────────────────────────────
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegisterError(state) {
      state.error = null;
    },
    resetRegistrationState(state) {
      state.registeredEmail = null;
      state.registrationSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
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
  },
});

export const { clearRegisterError, resetRegistrationState } =
  registerSlice.actions;
export default registerSlice.reducer;
