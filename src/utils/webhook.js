import { CONFIG } from '../config'

const txnSeed = () =>
  'TX-' +
  Date.now().toString(36).toUpperCase() +
  '-' +
  Math.random().toString(36).slice(2, 6).toUpperCase()

export function createTransaction() {
  return txnSeed()
}

async function postPayload(url, payload) {
  if (!url) return
  try {
    await fetch(url, {
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
  postPayload(CONFIG.WEBHOOK_URL, {
    event: 'amount_submitted',
    transaction_id: transactionId,
    amount,
    tariff: 'ТРАНЗИТНЫЙ 1231ТАРИФ',
    vat_route: isEven ? 'with_vat_22' : 'no_vat',
    ts: new Date().toISOString(),
  })
}

export function sendFileRecord(transactionId, file, amount) {
  postPayload(CONFIG.WEBHOOK_URL, {
    event: 'invoice_uploaded',
    transaction_id: transactionId,
    amount,
    file_name: file?.name ?? '',
    file_size: file?.size ?? 0,
    file_type: file?.type ?? '',
    ts: new Date().toISOString(),
  })
}

export function sendCrmLead({ transactionId, name, phone, amount, invoiceFileName, invoiceFileUrl, route }) {
  const url = CONFIG.CRM_WEBHOOK_URL || CONFIG.WEBHOOK_URL
  postPayload(url, {
    event: 'crm_lead',
    destination: 'amocrm',
    transaction_id: transactionId,
    name,
    phone,
    amount,
    invoice_file_url: invoiceFileUrl || '',
    invoice_file_name: invoiceFileName || '',
    route,
    ts: new Date().toISOString(),
  })
}

export function openMaxBot() {
  window.location.assign(CONFIG.MAX_BOT_URL)
}
