import { useRef, useState } from 'react'
import { UploadCloud, FileText, X, ChevronRight, CheckCircle2 } from 'lucide-react'

const ACCEPTED = '.pdf,.jpg,.jpeg,.png'
const OK_TYPES = ['application/pdf', 'image/jpeg', 'image/png']

export default function StepUpload({ amount, onBack, onNext }) {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  function validate(f) {
    if (!f) return 'Файл не выбран'
    const extOk = /\.(pdf|jpe?g|png)$/i.test(f.name)
    const typeOk = OK_TYPES.includes(f.type) || extOk
    if (!typeOk) return 'Допустимы только .pdf, .jpg, .jpeg, .png'
    if (f.size > 20 * 1024 * 1024) return 'Файл больше 20 МБ'
    return ''
  }

  function pick(f) {
    const err = validate(f)
    if (err) {
      setError(err)
      setFile(null)
      return
    }
    setError('')
    setFile(f)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    pick(e.dataTransfer.files?.[0])
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <header className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/15 ring-1 ring-amber-400/30">
          <FileText className="h-7 w-7 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Загрузите счёт конкурента</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          Прикрепите скан или фото счёта. Форматы: PDF, JPG, PNG. До 20 МБ.
        </p>
      </header>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300',
          dragging
            ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
            : 'border-slate-600 bg-slate-800/40 hover:border-emerald-500/60 hover:bg-slate-800/70',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
        {file ? (
          <div className="animate-scaleIn flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/40">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-white">{file.name}</p>
            <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} КБ</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setFile(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
              className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400"
            >
              <X className="h-3.5 w-3.5" /> Удалить файл
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className={['flex h-14 w-14 items-center justify-center rounded-full bg-slate-700/60', dragging ? 'animate-pulseGlow' : 'animate-float'].join(' ')}>
              <UploadCloud className="h-7 w-7 text-amber-400" />
            </div>
            <p className="text-sm font-medium text-slate-200">
              Перетащите файл сюда или нажмите для выбора
            </p>
            <p className="text-xs text-slate-500">PDF · JPG · PNG · до 20 МБ</p>
          </div>
        )}
      </div>

      {error && <p className="text-center text-sm text-amber-400">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-4 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
        >
          Назад
        </button>
        <button
          onClick={() => file && onNext(file)}
          disabled={!file}
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Запустить ИИ-проверку
          <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}
