import { ShieldCheck, Timer, Lock, ChevronRight } from 'lucide-react'
import { CONFIG } from '../config'
import { formatRub } from '../utils/format'
import useCountdown from '../utils/useCountdown'
import Odometer from './Odometer'

export default function StepSuccess({ amount, onNext }) {
  const discount = Math.round(amount * CONFIG.DISCOUNT_RATE)
  const { display } = useCountdown(CONFIG.HOLD_MINUTES)

  return (
    <div className="animate-fadeIn space-y-6">
      <header className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 animate-pulseGlow items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/40">
          <ShieldCheck className="h-9 w-9 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">✔ Контур ИИ подтвердил НДС 22%. Выставлен транзитный тариф!</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          Розничная наценка аннулирована. Стоимость материалов пересчитана напрямую от заводов-производителей. Ваша чистая экономия сформирована.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-slate-900/40 p-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
          Ваша гарантированная скидка сформирована
        </p>
        <div className="mt-2 flex items-baseline justify-center gap-2">
          <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text font-mono text-4xl font-extrabold text-transparent sm:text-5xl">
            <Odometer value={discount} />
          </span>
          <span className="text-3xl font-bold text-emerald-400">₽</span>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Сумма счёта: {formatRub(amount)} ₽ · Транзитный тариф · Скидка 10%
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
        <p className="text-sm leading-relaxed text-slate-200">
          <span className="font-semibold text-emerald-400">✔ Контур ИИ подтвердил НДС 22%.</span>{' '}
          Розничная наценка аннулирована. Стоимость материалов пересчитана напрямую от
          заводов-производителей. Ваша чистая экономия сформирована. Гарантия сохранения цены
          от дневных колебаний прайсов заводов зафиксирована на 15:00 минут.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3">
        <Timer className="h-5 w-5 animate-pulse text-amber-400" />
        <span className="font-mono text-2xl font-bold tabular-nums text-amber-400">{display}</span>
        <span className="text-xs font-medium text-amber-300/80">осталось для брони цены</span>
      </div>

      <button
        onClick={onNext}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
      >
        <Lock className="h-5 w-5" />
        Активировать транзитный тариф и забронировать счёт
        <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
      </button>
    </div>
  )
}
