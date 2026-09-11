import { useEffect, useRef, useState } from 'react'
import { Cpu, Loader2 } from 'lucide-react'

const LOG_LINES = [
  '[SYSTEM]: Инициализация цифрового контура ГлавСнаб-ИИ... ОК',
  '[SYSTEM]: Автоматический аудит скрытых розничных наценок... Найдено завышение',
  '[SYSTEM]: Проверка штампа и валидация налогового профиля НДС 22%...',
]

export default function StepVerify({ onComplete }) {
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState('')
  const lineIdx = useRef(0)
  const charIdx = useRef(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    let timer
    function tick() {
      if (lineIdx.current >= LOG_LINES.length) {
        setTyping('')
        timer = setTimeout(onComplete, 650)
        return
      }
      const current = LOG_LINES[lineIdx.current]
      charIdx.current += 1
      setTyping(current.slice(0, charIdx.current))
      if (charIdx.current >= current.length) {
        setLines((l) => [...l, current])
        setTyping('')
        lineIdx.current += 1
        charIdx.current = 0
        timer = setTimeout(tick, 480)
      } else {
        timer = setTimeout(tick, 22)
      }
    }
    timer = setTimeout(tick, 400)
    return () => clearTimeout(timer)
  }, [onComplete])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines, typing])

  return (
    <div className="animate-fadeIn space-y-6">
      <header className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-400/30">
          <Cpu className="h-7 w-7 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">ИИ-ядро анализирует документ</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          Цифровой контур ГлавСнаб-ИИ сканирует номенклатуру, наценки и налоговый профиль.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800/60 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-mono text-xs text-slate-400">glavsnab-ai ~ /audit</span>
          <Loader2 className="ml-auto h-3.5 w-3.5 animate-spin text-cyan-400" />
        </div>
        <div
          ref={scrollRef}
          className="term-scroll h-64 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed text-cyan-300 sm:h-72"
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap">
              <span className={l.endsWith('ОК') ? 'text-emerald-400' : 'text-cyan-300'}>{l}</span>
              {l.endsWith('ОК') && <span className="text-emerald-500"> ✓</span>}
            </div>
          ))}
          {typing && (
            <div className="whitespace-pre-wrap text-cyan-200">
              {typing}
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-cyan-400 align-middle" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
