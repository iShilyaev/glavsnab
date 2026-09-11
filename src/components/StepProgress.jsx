import { Check } from 'lucide-react'

export default function StepProgress({ current }) {
  const total = 5
  const labels = ['Сумма', 'Документ', 'Проверка', 'Результат', 'Бронь']
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1
          const done = n < current
          const active = n === current
          return (
            <div key={n} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 sm:h-10 sm:w-10',
                    done
                      ? 'bg-emerald-500 text-white'
                      : active
                        ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-400/20 scale-110'
                        : 'bg-slate-700 text-slate-400',
                  ].join(' ')}
                >
                  {done ? <Check className="h-5 w-5" /> : n}
                </div>
                <span
                  className={[
                    'hidden text-[11px] font-medium sm:block',
                    active ? 'text-amber-300' : done ? 'text-emerald-400' : 'text-slate-500',
                  ].join(' ')}
                >
                  {labels[i]}
                </span>
              </div>
              {i < total - 1 && (
                <div className="mx-1 h-1 flex-1 overflow-hidden rounded-full bg-slate-700 sm:mx-2">
                  <div
                    className={[
                      'h-full rounded-full transition-all duration-500',
                      done ? 'w-full bg-emerald-500' : active ? 'w-1/2 bg-amber-400' : 'w-0',
                    ].join(' ')}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex justify-between sm:hidden">
        {labels.map((l, i) => (
          <span
            key={l}
            className={[
              'flex-1 text-center text-[10px] font-medium',
              i + 1 === current ? 'text-amber-300' : i + 1 < current ? 'text-emerald-400' : 'text-slate-500',
            ].join(' ')}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}
