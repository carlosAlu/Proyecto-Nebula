import { API_URL } from './apiUrl.js'

const ORIENTATION_REQUESTS_URL = `${API_URL}/api/orientation-requests`
const ADMIN_ORIENTATION_REQUESTS_URL = `${API_URL}/api/auth/orientation-requests`

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
		throw new Error(result.mensaje || 'No se pudo completar la operación con las solicitudes.')
	}

	return result
}

export async function createOrientationRequest(orientationRequest) {
	const result = await request(ORIENTATION_REQUESTS_URL, {
		method: 'POST',
		body: JSON.stringify(orientationRequest),
	})
	return result.solicitud
}

export async function getOrientationRequests() {
	const result = await request(ADMIN_ORIENTATION_REQUESTS_URL)
	return result.solicitudes
}

export function deleteOrientationRequest(id) {
	return request(`${ADMIN_ORIENTATION_REQUESTS_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
