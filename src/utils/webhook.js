import { CONFIG } from '../config'

const txnSeed = () =>
  'TX-' +
  Date.now().toString(36).toUpperCase() +
  '-' +
  Math.random().toString(36).slice(2, 6).toUpperCase()

export function createTransaction() {
  return txnSeed()
}

async function postPayload(payload) {
  try {
    await fetch(CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch {
    /* best-effort background send */
  }
}

export function sendAmountRecord(transactionId, amount, isEven) {
  postPayload({
    event: 'amount_submitted',
    transaction_id: transactionId,
    amount,
    tariff: 'ТРАНЗИТНЫЙ 1231ТАРИФ',
    vat_route: isEven ? 'with_vat_22' : 'no_vat',
    ts: new Date().toISOString(),
  })
}

export function sendFileRecord(transactionId, file, amount) {
  postPayload({
    event: 'invoice_uploaded',
    transaction_id: transactionId,
    amount,
    file_name: file?.name ?? '',
    file_size: file?.size ?? 0,
    file_type: file?.type ?? '',
    ts: new Date().toISOString(),
  })
}

export function sendBookingRecord(transactionId, name, phone, amount, route) {
  postPayload({
    event: 'booking_confirmed',
    transaction_id: transactionId,
    name,
    phone,
    amount,
    route,
    ts: new Date().toISOString(),
  })
}
