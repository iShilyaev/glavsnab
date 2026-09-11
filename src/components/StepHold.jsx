import { AlertTriangle, Truck, Percent, ChevronRight, Timer } from 'lucide-react'
import { CONFIG } from '../config'
import { formatRub } from '../utils/format'
import useCountdown from '../utils/useCountdown'

export default function StepHold({ amount, onNext }) {
  const { display } = useCountdown(CONFIG.HOLD_MINUTES)

  return (
    <div className="animate-fadeIn space-y-6">
      <header className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 ring-1 ring-amber-400/40">
          <AlertTriangle className="h-9 w-9 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">⚙ Контур ИИ завершил аудит: Выставлен счет без НДС 22%</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          Подобраны альтернативные спец-условия по транзитному тарифу.
        </p>
      </header>

      <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <p className="text-sm leading-relaxed text-slate-200">
          <span className="font-semibold text-amber-400">⚙ Контур ИИ завершил аудит: Выставлен счет без НДС 22%.</span>{' '}
          Загруженный документ выставлен от компании на УСН или ИП без НДС. Прямая скидка 10%
          недоступна, так как наши базовые транзитные цены уже ниже розницы на 12–15%. Но система
          ГлавСнаб-ИИ заблокировала под вас спец-условия.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-b from-amber-400/15 to-slate-900/40 p-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <h3 className="text-base font-bold text-amber-300">Активирован спец-тариф</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-100">
          <span className="font-semibold text-white">БЕСПЛАТНАЯ ДОСТАВКА</span> всей партии
          спецтехникой на ваш объект <span className="text-amber-300">ИЛИ</span> доп. скидка{' '}
          <span className="font-semibold text-white">3%</span> на весь объём номенклатуры.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/60 px-3 py-2.5">
            <Truck className="h-5 w-5 text-emerald-400" />
            <span className="text-xs font-medium text-slate-200">Доставка спецтехникой</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/60 px-3 py-2.5">
            <Percent className="h-5 w-5 text-emerald-400" />
            <span className="text-xs font-medium text-slate-200">Доп. скидка 3%</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Сумма счёта: {formatRub(amount)} ₽ · Транзитный тариф (без НДС)
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 px-4 py-3">
        <Timer className="h-5 w-5 animate-pulse text-amber-400" />
        <span className="font-mono text-2xl font-bold tabular-nums text-amber-400">{display}</span>
        <span className="text-xs font-medium text-amber-300/80">осталось для брони условий</span>
      </div>

      <button
        onClick={onNext}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
      >
        Принять спец-условия и забронировать
        <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
      </button>
    </div>
  )
}
