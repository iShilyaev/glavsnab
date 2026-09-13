import { useCallback, useState } from 'react'
import { Building2 } from 'lucide-react'
import { CONFIG, STEP } from './config'
import MaxIcon from './components/MaxIcon'
import { createTransaction, openMaxBot, sendAmountRecord, sendCrmLead, sendFileRecord } from './utils/webhook'
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

  const goStart = useCallback(() => {
    setStep(STEP.UPLOAD)
  }, [])

  const goUpload = useCallback(
    (f, value) => {
      setAmount(value)
      const even = value % 2 === 0
      setRoute(even ? 'success' : 'hold')
      sendAmountRecord(txn, value, even)
      setFile(f)
      sendFileRecord(txn, f, value)
      setStep(STEP.VERIFY)
    },
    [txn],
  )

  const goVerify = useCallback(() => {
    setStep(STEP.RESULT)
  }, [])

  const goResult = useCallback(() => {
    setStep(STEP.BOOKING)
  }, [])

  const submitBooking = useCallback(
    (name, phone) => {
      sendCrmLead({
        transactionId: txn,
        name,
        phone,
        amount,
        invoiceFileName: file?.name ?? '',
        invoiceFileUrl: CONFIG.INVOICE_FILE_URL,
        route,
      })
      openMaxBot()
    },
    [txn, amount, file, route],
  )

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        {/* Brand header */}
        <header className="mb-6 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-400">Транзитный тарифСЕРВЕР ПОДКЛЮЧЕН. <br />ДОСТУП К ОПТОВЫМ БАЗАМ ОТКРЫТ.</p>
            </div>
          </div>
          <a
            href={CONFIG.SUPPORT_PHONE_TEL}
            className="flex shrink-0 items-start gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/50 px-2 py-1.5 text-left no-underline transition hover:border-slate-600 sm:gap-2 sm:px-3 sm:py-2"
          >
            <MaxIcon className="h-7 w-7 shrink-0 rounded-[8px] shadow-md sm:h-9 sm:w-9" />
            <div>
              <p className="max-w-[7.5rem] text-[10px] font-medium leading-tight text-slate-400 sm:max-w-none sm:text-[11px] sm:uppercase sm:tracking-wide">
                Техническая поддержка MAX
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[13px] font-semibold leading-tight text-white sm:text-[15px]">
                {CONFIG.SUPPORT_PHONE}
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[10px] text-slate-400 sm:text-xs">Часы работы: {CONFIG.SUPPORT_HOURS}</p>
            </div>
          </a>
        </header>

        {/* Step progress */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur sm:p-5">
          <StepProgress current={step} />
        </div>

        {/* Card */}
        <main className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 p-5 text-slate-100 shadow-2xl sm:p-7">
          {step === STEP.AMOUNT && <StepAmount onNext={goStart} />}
          {step === STEP.UPLOAD && (
            <StepUpload initialAmount={amount} onBack={() => setStep(STEP.AMOUNT)} onNext={goUpload} />
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
        <footer className="mt-6 text-center text-[10px] leading-relaxed text-slate-600">
          <p>
            &copy; {CONFIG.COPYRIGHT_YEAR} ИНН {CONFIG.COMPANY_INN}; все права защищены:{' '}
            <a href={CONFIG.PRIVACY_URL} className="text-slate-500 underline underline-offset-2 transition hover:text-slate-300">
              политика конфиденциальности
            </a>{' '}
            <a href={CONFIG.TERMS_URL} className="text-slate-500 underline underline-offset-2 transition hover:text-slate-300">
              пользовательские соглашения
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
