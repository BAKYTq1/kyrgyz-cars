export default function AccountHome() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8">
        <div className="text-sm font-medium text-slate-500">Добро пожаловать в личный кабинет</div>
        <div className="mt-4 text-2xl font-semibold text-slate-900">Здесь будет основная панель управления вашим аккаунтом</div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">Баланс ставок, лимиты и права доступа</div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">Статус депозита и последние ставки</div>
        </div>
      </div>
    </div>
  )
}
