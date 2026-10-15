import { useEffect, useState } from 'react'
import {
	deleteAnonymousReport,
	downloadAnonymousReportEvidence,
	getAnonymousReports,
	updateAnonymousReportStatus,
} from './anonymousReportsApi.js'

const reportStatuses = ['Recibido', 'En revisión', 'En seguimiento', 'Resuelto']

function Reportes({ onBack }) {
	const [reports, setReports] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [savingReportId, setSavingReportId] = useState('')
	const [deletingReportId, setDeletingReportId] = useState('')
	const [downloadingReportId, setDownloadingReportId] = useState('')
	const [error, setError] = useState('')
	const [notice, setNotice] = useState('')

	useEffect(() => {
		let isMounted = true
		getAnonymousReports()
			.then((loadedReports) => {
				if (isMounted) setReports(loadedReports)
			})
			.catch((loadError) => {
				if (isMounted) setError(loadError.message)
			})
			.finally(() => {
				if (isMounted) setIsLoading(false)
			})

		return () => { isMounted = false }
	}, [])

	const handleStatusChange = async (report, status) => {
		setSavingReportId(report._id)
		setError('')
		setNotice('')
		try {
			const updatedReport = await updateAnonymousReportStatus(report._id, status)
			setReports((currentReports) => currentReports.map((item) => (
				item._id === report._id ? updatedReport : item
			)))
			setNotice(`Se actualizó el avance del folio ${report.folio}.`)
		} catch (updateError) {
			setError(updateError.message)
		} finally {
			setSavingReportId('')
		}
	}

	const handleDelete = async (report) => {
		if (!window.confirm(`¿Eliminar el reporte ${report.folio}? Esta acción no se puede deshacer.`)) return

		setDeletingReportId(report._id)
		setError('')
		setNotice('')
		try {
			await deleteAnonymousReport(report._id)
			setReports((currentReports) => currentReports.filter((item) => item._id !== report._id))
			setNotice(`Se eliminó el reporte ${report.folio}.`)
		} catch (deleteError) {
			setError(deleteError.message)
		} finally {
			setDeletingReportId('')
		}
	}

	const handleEvidenceDownload = async (report) => {
		setDownloadingReportId(report._id)
		setError('')
		try {
			const evidence = await downloadAnonymousReportEvidence(report._id)
			const downloadUrl = URL.createObjectURL(evidence)
			const link = document.createElement('a')
			link.href = downloadUrl
			link.download = report.evidence.fileName
			link.click()
			window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
		} catch (downloadError) {
			setError(downloadError.message)
		} finally {
			setDownloadingReportId('')
		}
	}

	return (
		<div className="container admin-resource-manager">
			<div className="admin-resource-manager-heading">
				<div>
					<span className="eyebrow">Administración de contenido</span>
					<h2>Reportes anónimos</h2>
					<p>Consulta la información compartida y actualiza el avance que la usuaria verá con su folio.</p>
				</div>
				<button type="button" className="admin-resource-back" onClick={onBack}>
					← Volver al panel
				</button>
			</div>

			{error && <p className="admin-resource-message is-error" role="alert">{error}</p>}
			{notice && <p className="admin-resource-message is-success" role="status">{notice}</p>}
			{isLoading ? (
				<p className="admin-resource-loading" role="status">Cargando reportes…</p>
			) : reports.length ? (
				<ul className="admin-anonymous-report-list">
					{reports.map((report) => (
						<li className="admin-anonymous-report" key={report._id}>
							<div className="admin-anonymous-report-content">
								<div className="admin-anonymous-report-heading">
									<strong>{report.folio}</strong>
									<time dateTime={report.createdAt}>
										{new Date(report.createdAt).toLocaleString('es-MX')}
									</time>
								</div>
								<p><strong>Tipo de violencia:</strong> {report.type}</p>
								<p><strong>Lugar:</strong> {report.place}</p>
								<p className="admin-anonymous-report-description">{report.description}</p>
								{report.evidence?.fileName && (
									<button
										type="button"
										className="admin-anonymous-report-evidence"
										onClick={() => handleEvidenceDownload(report)}
										disabled={downloadingReportId === report._id}
									>
										{downloadingReportId === report._id ? 'Descargando…' : `Descargar evidencia: ${report.evidence.fileName}`}
									</button>
								)}
								<label className="admin-anonymous-report-status">
									Avance del reporte
									<select
										value={report.status}
										onChange={(event) => handleStatusChange(report, event.target.value)}
										disabled={savingReportId === report._id}
									>
										{reportStatuses.map((status) => (
											<option value={status} key={status}>{status}</option>
										))}
									</select>
									{savingReportId === report._id && <span role="status">Guardando…</span>}
								</label>
							</div>
							<button
								type="button"
								className="admin-resource-delete"
								onClick={() => handleDelete(report)}
								disabled={deletingReportId === report._id}
							>
								{deletingReportId === report._id ? 'Eliminando…' : 'Eliminar'}
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="admin-resource-empty">No hay reportes anónimos registrados.</p>
			)}
		</div>
	)
}

export default Reportes
