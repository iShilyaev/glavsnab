export function formatRub(value) {
  if (value == null || Number.isNaN(value)) return ''
  return Math.round(value).toLocaleString('ru-RU')
}

export function parseAmount(raw) {
  if (!raw) return 0
  const digits = String(raw).replace(/[^\d]/g, '')
  return digits ? parseInt(digits, 10) : 0
}

export function maskAmount(raw) {
  const digits = String(raw ?? '').replace(/[^\d]/g, '')
  if (!digits) return ''
  return parseInt(digits, 10).toLocaleString('ru-RU')
}

export function maskPhone(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '').replace(/^8/, '7').replace(/^([^7])/, '7$1')
  const d = digits.slice(0, 11)
  let out = '+7'
  if (d.length > 1) out += ' (' + d.slice(1, 4)
  if (d.length >= 4) out += ') ' + d.slice(4, 7)
  if (d.length >= 7) out += '-' + d.slice(7, 9)
  if (d.length >= 9) out += '-' + d.slice(9, 11)
  return out
}

export function phoneDigits(raw) {
  return String(raw ?? '').replace(/\D/g, '').slice(0, 11)
}

export function isPhoneComplete(raw) {
  return phoneDigits(raw).length === 11
}
