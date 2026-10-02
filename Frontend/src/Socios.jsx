import defaultImage from './assets/ImagenDefault.jpg'

// Datos de las instituciones aliadas: nombre, tipo de colaboración, enlace e imagen.
const partners = [
	{
		name: 'Centro Integral de Atención para la Mujer - Municipio de La Paz',
		type: 'Atención y orientación especializada',
		url: 'https://www.youtube.com',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Hw5VAIncngJw5YCWe26F_lRAPSj5O1CGcjH6HA1-9yZAxzQcGCB6Y_o&s=10',
	},
	{
		name: 'Centro de Justicia Para Las Mujeres',
		type: 'Red de apoyo y canalización',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=centro-justicia',
		image: 'https://storage.googleapis.com/tribunamexico/2024/04/gmKkN0FA-Tribuna-1.jpg',
	},
	{
		name: 'Centro Mujeres',
		type: 'Red de apoyo y canalización',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=centro-mujeres',
		image: 'https://lh3.googleusercontent.com/proxy/Pg656jhxLzYHo6ycLaG-Lvey3wF3xLTRoN4_shJ2j1A1SIf0Ln8ZumNzceGUBI3mKJ55XmkFmFyhcveDjX1oq4q1ToPKPX1UplWXYtlQqFohITXWpoTDjXYOKCFyYYX-OENxTJe2cUxC0q-B2jmQtyO9xRglIHbQ1MDmSg=s1360-w1360-h1020-rw',
	},
	{
		name: 'Instituto Sudcaliforniano de las Mujeres',
		type: 'Red de apoyo y canalización',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=instituto-sudcaliforniano',
		image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlr2xm4yjgvT7o-HGNWFLKetSxtVPsUsqnX9hTNlk7tU0deW1VtnP5RhzZppqj0WuY_YKoCBRvTysHw_lVx80youJmfsUUFKLD5-V_jxCFAj5DiIToYJ1-Ifi7izQ3kLxA7Dh2Z=s1360-w1360-h1020-rw',
	},
	{
		name: 'Instituto Municipal de Las Mujeres',
		type: 'Red de apoyo y canalización',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=instituto-municipal',
		image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnQVL9LjlN8QVwJ11KGeaTLFiVCEtwFBokWVubZH34P8s_037NGBqsnjLbyyNUjn2wpNEoLiJpiGdDWUeY2_BP_kaK5Fhr8Di0zUTq5ehXq1vPLoH7SyWxxHnhxotFEK3VX4hrT=s1360-w1360-h1020-rw',
	},
	{
		name: 'UNIVERSIDAD AUTÓNOMA DE BAJA CALIFORNIA SUR',
		type: 'Institución universitaria',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=uabcs',
		image: 'https://peninsulardigital.com/wp-content/uploads/2019/06/UABCS.jpg',
	},
	{
		name: 'COMPUSERVICIOSBCS',
		type: 'Institución privada',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&partner=compuserviciosbcs',
		image: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkSvHYBQEkJoI6X-D6UjmxXi-yvQgPNyMaVYnxw5YcsNM68CxSDUgCuhxxk5C2QST0Uwg3z4fzYLSwbztmccoJMBD8NFM5ZC3x5oNes-CciPAR7hncj_8NDMLe2XYxOjCjNYIcX1whIrmDK=s1360-w1360-h1020-rw',
	},


]

// Presenta el encabezado de la red y genera tarjetas enlazadas para cada socio.
function Socios() {
	return (
		<div id="socios" className="page-shell">
			<section className="page-header compact-hero">
				<div className="container">
					<span className="eyebrow">Red Nebula</span>
					<h1>Nuestros socios</h1>
					<p>Conoce a las instituciones y organizaciones que colaboran para ampliar el acceso al apoyo.</p>
				</div>
			</section>
			<section className="page-section">
				<div className="container">
					<div className="partners-grid" aria-label="Socios de Nebula">
						{/* Crea una tarjeta enlazada por institución usando los datos de partners. */}
						{partners.map((partner) => (
								<a
								key={partner.name}
									className="partner-card"
									href={partner.url}
									target="_blank"
									rel="noreferrer"
									aria-label={`Conoce a ${partner.name}`}
								>
									{/* Sustituye una imagen rota por la imagen local predeterminada. */}
									<img
										src={partner.image}
										alt=""
										onError={(event) => {
											event.currentTarget.onerror = null
											event.currentTarget.src = defaultImage
										}}
									/>
									<div className="partner-card-content">
										<h3>{partner.name}</h3>
										<p>{partner.type}</p>
										<span>Colaboración activa</span>
									</div>
								</a>
							))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Socios
