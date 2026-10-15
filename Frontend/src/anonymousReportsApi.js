import { API_URL } from './apiUrl.js'

const PUBLIC_REPORTS_URL = `${API_URL}/api/reports`
const ADMIN_REPORTS_URL = `${API_URL}/api/auth/reports/admin`

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
		throw new Error(result.mensaje || 'No se pudo completar la operación con el reporte.')
	}

	return result
}

export async function createAnonymousReport(report) {
	const result = await request(PUBLIC_REPORTS_URL, {
		method: 'POST',
		body: JSON.stringify(report),
	})
	return result.reporte
}

export async function getAnonymousReportStatus(folio) {
	const result = await request(`${PUBLIC_REPORTS_URL}/folio/${encodeURIComponent(folio)}`)
	return result.reporte
}

export async function getAnonymousReports() {
	const result = await request(ADMIN_REPORTS_URL)
	return result.reportes
}

export async function updateAnonymousReportStatus(id, status) {
	const result = await request(`${ADMIN_REPORTS_URL}/${encodeURIComponent(id)}/status`, {
		method: 'PATCH',
		body: JSON.stringify({ status }),
	})
	return result.reporte
}

export function deleteAnonymousReport(id) {
	return request(`${ADMIN_REPORTS_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function downloadAnonymousReportEvidence(id) {
	const response = await fetch(`${ADMIN_REPORTS_URL}/${encodeURIComponent(id)}/evidence`, {
		credentials: 'include',
	})
	if (!response.ok) {
		const result = await response.json()
		throw new Error(result.mensaje || 'No se pudo descargar el archivo adjunto.')
	}
	return response.blob()
}
