import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { readFromDatabase } from '../Firebase';

import Card from './Card';
import './../styles/Card.css';

export default function Form() {
	const uuid = useParams('uuid').uuid;
	const [userData, setUserData] = useState({});

	useEffect(() => {
		readFromDatabase(uuid).then((data) => {
			setUserData(data);
		});
	}, []);

	return (
		<>
			<h1>{userData.full_name}</h1>
			<Card>
				<p>
					<strong>Año de Nacimiento: </strong>
					{userData.birth_date}
				</p>
				<p>
					<strong>Correo Electrónico: </strong>
					{userData.email}
				</p>

				<p>
					<strong>País de Origen: </strong>
					{userData.country_of_origin?.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())}
				</p>
				<p>
					<strong>Términos y condiciones: </strong>
					{userData.terms_and_conditions ? 'Aceptados' : 'Rechazados'}
				</p>
			</Card>
		</>
	);
}
