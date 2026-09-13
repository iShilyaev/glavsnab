import { useState } from 'react'
import { User, Phone, Lock, Loader2 } from 'lucide-react'
import { maskPhone, isPhoneComplete } from '../utils/format'
import MaxIcon from './MaxIcon'

export default function StepBooking({ onSubmit, onBack }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)

  const nameOk = name.trim().length >= 2
  const phoneOk = isPhoneComplete(phone)
  const canSubmit = nameOk && phoneOk && !sending

  function submit() {
    if (!canSubmit) return
    setSending(true)
    onSubmit(name.trim(), phone)
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <header className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <Lock className="h-7 w-7 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">Активировать транзитный тариф и закрепить цену за номером</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          Оставьте контакты — данные уйдут в CRM, и вы сразу перейдёте в чат-бот MAX для подтверждения брони.
        </p>
      </header>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Ваше имя</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван"
              autoComplete="name"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-3.5 pl-11 pr-4 text-base text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Телефон</label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && submit()}
              placeholder="+7 (999) 999-99-99"
              autoComplete="tel"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-3.5 pl-11 pr-4 text-base tracking-wide text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
          {phone && !phoneOk && (
            <p className="mt-1.5 text-xs text-amber-400">Введите номер полностью</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={sending}
          className="rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-4 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 disabled:opacity-40"
        >
          Назад
        </button>
        <button
          onClick={submit}
          disabled={!canSubmit}
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {sending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Открываем MAX...
            </>
          ) : (
            <>
              Забронировать и получить счёт на оплату
            </>
          )}
        </button>
      </div>
      <p className="text-center text-xs text-slate-500">
        Нажимая «Забронировать цену в МАКС», вы соглашаетесь на обработку персональных данных.
      </p>
    </div>
  )
}
