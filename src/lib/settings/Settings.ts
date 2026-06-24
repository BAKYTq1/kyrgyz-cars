import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../api/Api";

// ─── Types ────────────────────────────────────────────────────────────────────
// Под реальный API: POST /api/change-password/
export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password2: string;
}

export interface ChangePasswordResponse {
  detail: string; // "Пароль успешно изменён"
}

// ─── State ────────────────────────────────────────────────────────────────────
interface SettingsState {
  loading: boolean;
  error: string | null;
  passwordChangeSuccess: boolean;
}

const initialState: SettingsState = {
  loading: false,
  error: null,
  passwordChangeSuccess: false,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────
export const changePasswordThunk = createAsyncThunk(
  "settings/changePassword",
  async (payload: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      return await apiFetch<ChangePasswordResponse>(
        "/change-password/",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        true, // withAuth — нужен Bearer токен
      );
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettingsError(state) {
      state.error = null;
    },
    resetPasswordChangeState(state) {
      state.passwordChangeSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordChangeSuccess = false;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.passwordChangeSuccess = true;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSettingsError, resetPasswordChangeState } =
  settingsSlice.actions;
export default settingsSlice.reducer;
