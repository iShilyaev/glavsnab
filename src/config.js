const env = import.meta.env

export const CONFIG = {
  WEBHOOK_URL: env.VITE_WEBHOOK_URL || '',
  CRM_WEBHOOK_URL: env.VITE_CRM_WEBHOOK_URL || '',
  MAX_BOT_URL: env.VITE_MAX_BOT_URL || 'https://max.ru',
  INVOICE_FILE_URL: '',
  HOLD_MINUTES: 15,
  DISCOUNT_RATE: 0.1,
  MIN_AMOUNT: 100000,
  MAX_FILE_MB: 20,
  SUPPORT_PHONE: '+7(953) 492-02-76',
  SUPPORT_PHONE_TEL: 'tel:+79534920276',
  SUPPORT_HOURS: '8:00–18:00',
  COPYRIGHT_YEAR: '2026',
  COMPANY_INN: '1650446475',
  PRIVACY_URL: '#privacy',
  TERMS_URL: '#terms',
}

const STEP_LABELS = ['Старт', 'Документ', 'Проверка', 'Результат', 'Бронь']

export const STEP = {
  AMOUNT: 1,
  UPLOAD: 2,
  VERIFY: 3,
  RESULT: 4,
  BOOKING: 5,
}

export function stepLabel(step) {
  return STEP_LABELS[step - 1] ?? ''
}

export function stepIndex(step) {
  return step - 1
}
