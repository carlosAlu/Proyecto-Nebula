import { API_URL } from './apiUrl.js'

const PARTNERS_URL = `${API_URL}/api/partners`
const ADMIN_PARTNERS_URL = `${API_URL}/api/auth/partners`

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.mensaje || 'No se pudo completar la operación con los colaboradores.')
  }

  return result
}

export async function getPartners() {
  const result = await request(PARTNERS_URL)
  return result.colaboradores
}

export async function createPartner(partner) {
  const result = await request(ADMIN_PARTNERS_URL, {
    method: 'POST',
    body: JSON.stringify(partner),
  })
  return result.colaborador
}

export async function updatePartner(id, partner) {
  const result = await request(`${ADMIN_PARTNERS_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(partner),
  })
  return result.colaborador
}

export function deletePartner(id) {
  return request(`${ADMIN_PARTNERS_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
