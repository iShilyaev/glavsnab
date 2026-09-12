export const CONFIG = {
  WEBHOOK_URL: 'https://google.com',
  HOLD_MINUTES: 15,
  DISCOUNT_RATE: 0.1,
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
