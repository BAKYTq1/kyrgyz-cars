import { useState } from "react";
import { Link } from "react-router-dom";
import LocaleSwitcher from "../../shared/i18n/LocaleSwitcher";
import { useI18n } from "../../shared/i18n/I18nProvider";
import { useAppSelector } from "../../lib/store";
import logo from "../../assets/logotip.png";

function UserIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
      />
    </svg>
  );
}

function UserMenu() {
  const { t } = useI18n();
  const { user } = useAppSelector((s) => s.auth);

  return (
    <Link
      to="/account"
      className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
    >
      <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
        <UserIcon />
      </div>
      <span className="text-sm text-gray-700 max-w-[100px] truncate">
        {user?.first_name || t("common.account")}
      </span>
    </Link>
  );
}

function MobileUserLinks({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useI18n();
  const { user } = useAppSelector((s) => s.auth);

  return (
    <Link
      to="/account"
      onClick={onNavigate}
      className="flex items-center gap-3 border border-gray-300 rounded-lg py-2.5 px-3 text-gray-700"
    >
      <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
        <UserIcon />
      </div>
      {user?.first_name || t("common.account")}
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  return (
    <header className="bg-white text-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-[150px] h-11 flex items-center justify-center">
            <img
              src={logo}
              alt="CarDeals"
              className="w-full h-11 object-contain"
            />
          </div>
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl border border-gray-300 rounded-lg overflow-hidden">
          <select className="px-3 py-2 text-sm bg-gray-50 border-r border-gray-300 outline-none text-gray-700">
            <option>{t("header.current")}</option>
            <option>{t("header.archive")}</option>
          </select>
          <input
            type="text"
            placeholder={t("header.searchPlaceholder")}
            className="flex-1 px-4 py-2 text-sm outline-none text-gray-800"
          />
          <button className="px-4 bg-white hover:bg-gray-50 transition border-l border-gray-300">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
          <LocaleSwitcher />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
              >
                {t("common.login")}
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 text-sm px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition"
              >
                {t("common.register")}
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2 ml-auto">
          <LocaleSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-gray-100 transition"
            aria-label="Меню"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 text-sm text-gray-600">
            <Link
              to="/catalog"
              className="px-3 py-3 hover:text-violet-600 transition"
            >
              {t("header.navSearch")}
            </Link>
            <Link
              to="/delivery-times"
              className="px-3 py-3 hover:text-violet-600 transition"
            >
              {t("header.navDelivery")}
            </Link>
            <Link
              to="/how-it-works"
              className="px-3 py-3 hover:text-violet-600 transition"
            >
              {t("header.navHowItWorks")}
            </Link>
            <Link
              to="/help"
              className="px-3 py-3 hover:text-violet-600 transition"
            >
              {t("header.navHelp")}
            </Link>
            <Link
              to="/about"
              className="px-3 py-3 hover:text-violet-600 transition"
            >
              {t("header.navAbout")}
            </Link>
            <Link
              to="/contacts"
              className="px-3 py-3 hover:text-violet-600 transition"
            >
              {t("header.navContacts")}
            </Link>
            <div className="ml-auto text-xs text-gray-400">
              {t("header.hours")}
            </div>
          </nav>
        </div>
      </div>

      {/* Мобильное меню — absolute поверх контента */}
      <div
        className={`md:hidden fixed inset-x-0 top-[57px] bg-white border-t border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 py-4 flex flex-col gap-3 text-sm">
          <input
            type="text"
            placeholder={t("header.mobileSearch")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
          <Link
            to="/catalog"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 hover:text-violet-600 transition"
          >
            {t("header.navSearch")}
          </Link>
          <Link
            to="/delivery-times"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 hover:text-violet-600 transition"
          >
            {t("header.navDelivery")}
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 hover:text-violet-600 transition"
          >
            {t("header.navHowItWorks")}
          </Link>
          <Link
            to="/help"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 hover:text-violet-600 transition"
          >
            {t("header.navHelp")}
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 hover:text-violet-600 transition"
          >
            {t("header.navAbout")}
          </Link>
          <Link
            to="/contacts"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 hover:text-violet-600 transition"
          >
            {t("header.navContacts")}
          </Link>
          {isAuthenticated ? (
            <MobileUserLinks onNavigate={() => setMenuOpen(false)} />
          ) : (
            <div className="flex gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center border border-gray-300 rounded-lg py-2 text-gray-700"
              >
                {t("common.login")}
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center bg-violet-600 rounded-lg py-2 text-white"
              >
                {t("common.register")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
