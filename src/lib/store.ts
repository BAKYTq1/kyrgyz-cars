import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import lotReducer from "./lot/lotSlice";
import authReducer from "./auth/Login";
import registerReducer from "./auth/Register";
import settingsReducer from "../lib/settings/Settings";
import forgotPasswordReducer from "./auth/ForgotPassword";

export const store = configureStore({
  reducer: {
    lots: lotReducer,
    register: registerReducer,
    auth: authReducer,
    settings: settingsReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
