import { ShieldCheck, ChevronRight } from 'lucide-react'

export default function StepAmount({ onNext }) {
  return (
    <div className="animate-fadeIn space-y-6">
      <header className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <ShieldCheck className="h-7 w-7 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">Закупки по ценам заводов. Снижение стоимости
        строительных смет до 10%.</h2>
        <p className="mx-auto mt-3 text-sm leading-relaxed text-slate-400">Вы подключились к закрытой ИИ-платформе «ГлавСнаб-ИИ». Сервис разработан для ликвидации розничных накруток строительных сетей, баз и рынков при ремонте квартир и строительстве домов. Алгоритм напрямую сопоставляет номенклатуру вашего счета со складскими базами заводов-изготовителей и пересчитывает заказ по закрытой отрезной себестоимости.</p>
      </header>

      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <p className="text-sm leading-relaxed text-slate-200">
            <span className="font-semibold text-emerald-400">ГлавСнаб-ИИ</span> — прямые поставки с
            заводов-производителей. ИИ-ядро автоматически пересчитает ваш заказ по закрытому транзитному
            тарифу и ликвидирует розничные наценки.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
      >
        Продолжить
        <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
      </button>
    </div>
  )
}
