import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../lib/store";
import { logoutThunk } from "../../lib/auth/Login";

const BREADCRUMBS: Record<string, string> = {
  "": "Обзор",
  profile: "Личная информация",
  deposits: "Депозит и ставки",
  settings: "Настройки",
  watchlist: "Watchlist / Favorites",
  shipping: "Доставка",
  current: "Текущие ставки",
  won: "Выигранные ставки",
  lost: "Потерянные ставки",
};

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const TruckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const BidIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const WonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const LostIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const LogoutIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const PlusIcon = () => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const RefundIcon = () => (
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
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-3.96" />
  </svg>
);

export default function AccountLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  const pageLabel = BREADCRUMBS[segment] ?? segment;

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "24px 16px",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* ══ MOBILE < 930px ══ */}
        <div className="min-[930px]:hidden mb-4 flex flex-col gap-2">
          {/* Строка 1 */}
          <div className="bg-white border border-slate-200 rounded-xl px-2 py-3">
            <div className="flex items-start justify-around">
              <MobileNavItem
                to="watchlist"
                icon={<HeartIcon />}
                iconBg="#e0e7ff"
                iconColor="#6366f1"
                label="Список"
                count={0}
                active={segment === "watchlist"}
              />
              <MobileNavItem
                to="shipping"
                icon={<TruckIcon />}
                iconBg="#d1fae5"
                iconColor="#059669"
                label="Доставка"
                count={0}
                active={segment === "shipping"}
              />
              <MobileNavItem
                to="current"
                icon={<BidIcon />}
                iconBg="#e0e7ff"
                iconColor="#6366f1"
                label="Текущие ставки"
                count={0}
                active={segment === "current"}
              />
              <MobileNavItem
                to="won"
                icon={<WonIcon />}
                iconBg="#d1fae5"
                iconColor="#059669"
                label="Выигранные ставки"
                count={0}
                active={segment === "won"}
              />
              <MobileNavItem
                to="lost"
                icon={<LostIcon />}
                iconBg="#fee2e2"
                iconColor="#dc2626"
                label="Потерянные ставки"
                count={0}
                active={segment === "lost"}
              />
            </div>
          </div>

          {/* Строка 2 */}
          <div className="bg-white border border-slate-200 rounded-xl px-2 py-3">
            <div className="flex items-start justify-around">
              <MobileActionItem
                icon={<PlusIcon />}
                iconBg="#16a34a"
                iconColor="#fff"
                label="Увеличить количество"
                onClick={() => {}}
              />
              <MobileActionItem
                icon={<RefundIcon />}
                iconBg="#f97316"
                iconColor="#fff"
                label="Возврат депозита"
                onClick={() => {}}
              />
              <MobileNavItem
                to="profile"
                icon={<UserIcon />}
                iconBg="#dbeafe"
                iconColor="#2563eb"
                label="Личная информация"
                active={segment === "profile"}
              />
              <MobileNavItem
                to="settings"
                icon={<LockIcon />}
                iconBg="#fef9c3"
                iconColor="#ca8a04"
                label="Изменение пароля"
                active={segment === "settings"}
              />
              <MobileActionItem
                icon={<LogoutIcon />}
                iconBg="#fee2e2"
                iconColor="#dc2626"
                label="Выйти"
                onClick={handleLogout}
              />
            </div>
          </div>

          {/* Контент */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Outlet />
          </div>
        </div>

        {/* ══ DESKTOP ≥ 930px ══ */}
        <div
          className="hidden min-[930px]:grid"
          style={{ gap: 20, gridTemplateColumns: "300px 1fr" }}
        >
          {/* Сайдбар */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              to="watchlist"
              style={{ ...cardStyle, textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  background: "#f1f5f9",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    ...iconBadge,
                    background: "#e0e7ff",
                    color: "#6366f1",
                  }}
                >
                  <HeartIcon />
                </div>
                <div>
                  <div style={labelStyle}>Watchlist / Favorites</div>
                  <div style={valueStyle}>0</div>
                </div>
              </div>
            </Link>

            <Link
              to="shipping"
              style={{ ...cardStyle, textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  background: "#f1f5f9",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    ...iconBadge,
                    background: "#d1fae5",
                    color: "#059669",
                  }}
                >
                  <TruckIcon />
                </div>
                <div>
                  <div style={labelStyle}>Доставка</div>
                  <div style={valueStyle}>0</div>
                </div>
              </div>
            </Link>

            <div style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
                >
                  Количество ставок
                </span>
                <button style={smallBtnStyle}>Возврат депозита</button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  { label: "Общее количество", value: "$0" },
                  { label: "Лимит ставок", value: "0" },
                  { label: "Доступное количество", value: "$0" },
                  { label: "Активные ставки", value: "0" },
                ].map(({ label, value }) => (
                  <div key={label} style={miniCardStyle}>
                    <div style={miniLabelStyle}>{label}</div>
                    <div style={miniValueStyle}>{value}</div>
                  </div>
                ))}
              </div>
              <button style={greenBtnStyle}>Увеличить количество</button>
            </div>

            <div style={cardStyle}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 10,
                }}
              >
                Мои аукционы
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <AuctionRow
                  icon={<BidIcon />}
                  iconBg="#e0e7ff"
                  iconColor="#6366f1"
                  label="Текущие ставки"
                  value={0}
                  to="current"
                />
                <AuctionRow
                  icon={<WonIcon />}
                  iconBg="#d1fae5"
                  iconColor="#059669"
                  label="Выигранные ставки"
                  value={0}
                  to="won"
                />
                <AuctionRow
                  icon={<LostIcon />}
                  iconBg="#fee2e2"
                  iconColor="#dc2626"
                  label="Потерянные ставки"
                  value={0}
                  to="lost"
                />
              </div>
            </div>

            <div style={cardStyle}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 10,
                }}
              >
                Редактировать профиль
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <NavRow
                  icon={<UserIcon />}
                  iconBg="#dbeafe"
                  iconColor="#2563eb"
                  label="Личная информация"
                  to="profile"
                />
                <NavRow
                  icon={<LockIcon />}
                  iconBg="#fef9c3"
                  iconColor="#ca8a04"
                  label="Изменение пароля"
                  to="settings"
                />
                <button
                  onClick={handleLogout}
                  style={{
                    ...navRowBase,
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      ...iconBadge,
                      background: "#fee2e2",
                      color: "#dc2626",
                      flexShrink: 0,
                    }}
                  >
                    <LogoutIcon />
                  </div>
                  <span
                    style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}
                  >
                    Выйти
                  </span>
                </button>
              </div>
            </div>
          </aside>

          {/* Контент */}
          <section style={{ ...cardStyle, padding: 28 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Мой аккаунт
            </h1>
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.36em",
                  textTransform: "uppercase",
                  color: "#242527",
                  marginBottom: 6,
                }}
              >
                Личный кабинет{" "}
                {pageLabel && pageLabel !== "Обзор" ? `> ${pageLabel}` : ""}
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 20,
                padding: 24,
                minHeight: 380,
              }}
            >
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function AuctionRow({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  to,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: number;
  to: string;
}) {
  return (
    <Link
      to={to}
      style={{
        ...navRowBase,
        textDecoration: "none",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            ...iconBadge,
            background: iconBg,
            color: iconColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
          {label}
        </span>
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
        {value}
      </span>
    </Link>
  );
}

function NavRow({
  icon,
  iconBg,
  iconColor,
  label,
  to,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  to: string;
}) {
  return (
    <Link to={to} style={{ ...navRowBase, textDecoration: "none" }}>
      <div
        style={{
          ...iconBadge,
          background: iconBg,
          color: iconColor,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
        {label}
      </span>
    </Link>
  );
}

function MobileNavItem({
  to,
  icon,
  iconBg,
  iconColor,
  label,
  count,
  active,
}: {
  to: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className="no-underline flex flex-col items-center gap-1 flex-1"
    >
      <div
        className="relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background: active ? "#3b82f6" : iconBg,
          color: active ? "#fff" : iconColor,
        }}
      >
        {icon}
        {count !== undefined && !active && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
            {count}
          </span>
        )}
      </div>
      <span className="text-[9px] text-slate-500 text-center leading-tight w-full h-8 flex items-start justify-center pt-0.5">
        {label}
      </span>
    </Link>
  );
}

function MobileActionItem({
  icon,
  iconBg,
  iconColor,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 flex-1 border-none bg-transparent cursor-pointer p-0"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <span className="text-[9px] text-slate-500 text-center leading-tight w-full h-8 flex items-start justify-center pt-0.5">
        {label}
      </span>
    </button>
  );
}

// ── Shared styles ──

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 20,
  padding: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};
const iconBadge: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const labelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "#94a3b8",
  marginBottom: 2,
};
const valueStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: "#0f172a",
};
const smallBtnStyle: React.CSSProperties = {
  background: "#f1f5f9",
  border: "none",
  borderRadius: 10,
  padding: "5px 10px",
  fontSize: 11,
  fontWeight: 600,
  color: "#475569",
  cursor: "pointer",
};
const miniCardStyle: React.CSSProperties = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 14,
  padding: "10px 12px",
};
const miniLabelStyle: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#94a3b8",
  marginBottom: 4,
};
const miniValueStyle: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  color: "#0f172a",
};
const greenBtnStyle: React.CSSProperties = {
  marginTop: 12,
  width: "100%",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  padding: "12px 0",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
};
const navRowBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: "10px 14px",
};
