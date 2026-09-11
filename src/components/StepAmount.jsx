import { ShieldCheck, ChevronRight, Lock } from 'lucide-react'
import { useState } from 'react'
import { maskAmount, parseAmount } from '../utils/format'

export default function StepAmount({ initial, onNext }) {
  const [raw, setRaw] = useState(initial ? String(initial) : '')
  const amount = parseAmount(raw)
  const valid = amount >= 100000

  function submit() {
    if (!valid) return
    onNext(amount)
  }

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

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Введите общую сумму вашего текущего счета, ₽</label>
        <div className="relative">
          <input
            inputMode="numeric"
            autoComplete="off"
            autoFocus
            value={maskAmount(raw)}
            onChange={(e) => setRaw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && valid && submit()}
            placeholder="500 000"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-4 text-2xl font-semibold tracking-wide text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500">₽</span>
        </div>
        {raw !== '' && !valid && (
          <p className="mt-2 text-sm text-amber-400">⚠️ Внимание: Минимальная сумма счета для активации транзитного тарифа дистрибьютора составляет 100 000 ₽.</p>
        )}
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <Lock className="h-3.5 w-3.5" /> Безопасно. Данные шифруются. ИИ сверяет итоговую сумму с вашим файлом на Шаге 3.
        </p>
      </div>

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
        onClick={submit}
        disabled={!valid}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
Запустить ИИ-анализ
        <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
      </button>
    </div>
  )
}
