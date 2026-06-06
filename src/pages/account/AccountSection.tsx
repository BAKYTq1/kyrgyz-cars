type AccountSectionProps = {
  title: string
  description: string
}

function AccountSection({ title, description }: AccountSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
          Здесь будет информация по разделу.
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
          Дополнительные элементы управления и карточки данных.
        </div>
      </div>
    </div>
  )
}

export function AccountProfile() {
  return (
    <AccountSection
      title="Личная информация"
      description="Просмотрите и обновите свои личные данные, контактную информацию и настройки безопасности."
    />
  )
}

export function AccountDeposits() {
  return (
    <AccountSection
      title="Депозит и ставки"
      description="Проверьте состояние депозита, историю ставок и доступные средства для участия в аукционах."
    />
  )
}

export function AccountSettings() {
  return (
    <AccountSection
      title="Настройки аккаунта"
      description="Управляйте языком интерфейса, уведомлениями и другими параметрами пользователя."
    />
  )
}
