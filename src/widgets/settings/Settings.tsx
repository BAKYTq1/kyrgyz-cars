import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import {
  changePasswordThunk,
  clearSettingsError,
  resetPasswordChangeState,
} from "../../lib/settings/Settings";

type Step = "old" | "new";

function getPasswordStrength(password: string): {
  score: number; // 0-3
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Слабый", color: "bg-red-400" };
  if (score === 2) return { score, label: "Средний", color: "bg-amber-400" };
  return { score: 3, label: "Надёжный", color: "bg-green-500" };
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  autoFocus,
  onKeyDown,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-slate-300"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
      >
        {visible ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3l18 18" />
            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
            <path d="M9.88 4.12A9.77 9.77 0 0 1 12 4c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61C4.07 8.36 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.39-1.61" />
          </svg>
        )}
      </button>
    </div>
  );
}

export function Settings() {
  const dispatch = useAppDispatch();
  const { loading, error, passwordChangeSuccess } = useAppSelector(
    (state) => state.settings,
  );

  const [step, setStep] = useState<Step>("old");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const strength = getPasswordStrength(newPassword);
  const passwordsMatch =
    confirmPassword.length === 0 || newPassword === confirmPassword;
  const isLongEnough = newPassword.length >= 8;

  const handleNextStep = () => {
    if (!oldPassword) {
      setLocalError("Введите текущий пароль");
      return;
    }
    setLocalError(null);
    setStep("new");
  };

  const handleBack = () => {
    setLocalError(null);
    setTouched(false);
    dispatch(clearSettingsError());
    setStep("old");
  };

  const handleSubmit = async () => {
    setLocalError(null);
    setTouched(true);

    if (!newPassword || !confirmPassword) {
      setLocalError("Заполните оба поля пароля");
      return;
    }
    if (!isLongEnough) {
      setLocalError("Пароль должен содержать минимум 8 символов");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Пароли не совпадают");
      return;
    }

    const result = await dispatch(
      changePasswordThunk({
        old_password: oldPassword,
        new_password: newPassword,
        new_password2: confirmPassword,
      }),
    );

    if (changePasswordThunk.fulfilled.match(result)) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTouched(false);
      setStep("old");
      setTimeout(() => dispatch(resetPasswordChangeState()), 3000);
    }
  };

  const displayError = localError || error;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200">
        <h1 className="text-base font-medium text-slate-900">
          Изменение пароля
        </h1>
      </div>

      <div className="px-6 py-6">
        {passwordChangeSuccess && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
            Пароль успешно изменён
          </div>
        )}

        {displayError && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {displayError}
          </div>
        )}

        {/* Шаг 1: текущий пароль */}
        {step === "old" && (
          <div className="mb-6">
            <label className="block text-sm text-slate-500 mb-1.5">
              Текущий пароль <span className="text-red-400">*</span>
            </label>
            <PasswordInput
              value={oldPassword}
              onChange={setOldPassword}
              placeholder="Введите текущий пароль"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleNextStep()}
            />
          </div>
        )}

        {/* Шаг 2: новый пароль + подтверждение */}
        {step === "new" && (
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1.5">
                  Новый пароль
                </label>
                <PasswordInput
                  value={newPassword}
                  onChange={(v) => {
                    setNewPassword(v);
                    setTouched(true);
                  }}
                  placeholder="Введите новый пароль"
                  autoFocus
                />

                {newPassword.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i < strength.score ? strength.color : "bg-slate-100"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        strength.score <= 1
                          ? "text-red-500"
                          : strength.score === 2
                            ? "text-amber-500"
                            : "text-green-600"
                      }`}
                    >
                      {strength.label}
                    </p>
                  </div>
                )}

                {touched && !isLongEnough && newPassword.length > 0 && (
                  <p className="text-xs text-red-500 mt-1.5">
                    Минимум 8 символов
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1.5">
                  Подтвердите пароль
                </label>
                <PasswordInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Повторите новый пароль"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                {confirmPassword.length > 0 && (
                  <p
                    className={`text-xs mt-1.5 ${
                      passwordsMatch ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {passwordsMatch
                      ? "Пароли совпадают"
                      : "Пароли не совпадают"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <hr className="border-slate-100 mb-6" />

        {/* Кнопки */}
        <div className="flex gap-3">
          {step === "new" && (
            <button
              onClick={handleBack}
              disabled={loading}
              className="bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all text-slate-600 rounded-lg px-6 py-2.5 text-sm font-medium"
            >
              Назад
            </button>
          )}

          {step === "old" ? (
            <button
              onClick={handleNextStep}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white rounded-lg px-8 py-2.5 text-sm font-medium"
            >
              Далее
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white rounded-lg px-8 py-2.5 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Сохранение..." : "Сохранить настройки"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
