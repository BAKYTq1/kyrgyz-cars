export function Settings() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200">
        <h1 className="text-base font-medium text-slate-900">
          Изменение пароля
        </h1>
      </div>

      <div className="px-6 py-6">
        {/* Новый пароль + Подтвердите пароль */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-500 mb-1.5">
              Новый пароль
            </label>
            <input
              type="password"
              placeholder="Введите новый пароль"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-slate-300"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1.5">
              Подтвердите пароль
            </label>
            <input
              type="password"
              placeholder="Повторите новый пароль"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Текущий пароль */}
        <div className="mb-6">
          <label className="block text-sm text-slate-500 mb-1.5">
            Текущий пароль <span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            placeholder="Введите текущий пароль"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-slate-300"
          />
        </div>

        <hr className="border-slate-100 mb-6" />

        {/* Save button */}
        <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white rounded-lg px-8 py-2.5 text-sm font-medium">
          Сохранить настройки
        </button>
      </div>
    </div>
  );
}
