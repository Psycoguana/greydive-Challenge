import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { writeToDatabase } from '../Firebase';

import './../App.css';
import rawDb from '../assets/db.json';
import Card from './Card';
import Modal from './Modal';

export default function Home() {
	const dbData = rawDb.items;

	// Add a UUID to identify this user.
	const [uuid, setUuid] = useState(uuidv4());

	const [userData, setUserData] = useState({});
	const [showModal, setShowModal] = useState(false);

	function SelectField(item) {
		return (
			<select
				required
				defaultValue="none"
				className="btn"
				onChange={(e) => {
					setUserData((prevData) => ({ ...prevData, [item.name]: e.target.value }));
				}}
			>
				<option value="none" disabled hidden />

				{item.options.map((option) => {
					return (
						<option value={option.value} key={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
		);
	}

	function NormalField(item) {
		let className;
		if (item.type === 'submit') {
			className = 'btn btn-submit';
		} else if (item.type === 'checkbox' || item.type === 'date') {
			className = 'btn';
		} else {
			className = null;
		}

		return (
			<input
				required
				className={className}
				type={item.type}
				name={item.name}
				value={userData[item.name] === undefined && item.type !== 'submit' ? '' : userData[item.name]}
				onChange={(e) => {
					return setUserData((prevData) => {
						const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
						return { ...prevData, [item.name]: value };
					});
				}}
			></input>
		);
	}

	function LoadInputFromItem(item, index) {
		return (
			<p key={index}>
				{item.type !== 'submit' && <label htmlFor={item.name}>{`${item.label}: `}</label>}

				{item.type === 'select' && SelectField(item)}
				{item.type !== 'select' && NormalField(item)}
			</p>
		);
	}

	function handleSubmit(e) {
		e.preventDefault();
		writeToDatabase(userData, uuid);
		setShowModal(true);
	}

	return (
		<>
			<Card>
				<h1>Nico's Form 😊</h1>
				<form onSubmit={(e) => handleSubmit(e)}>
					{dbData.map((item, index) => {
						return LoadInputFromItem(item, index);
					})}
				</form>
			</Card>

			<Modal
				title="Formulario enviado!"
				content={
					<p>
						Para ver el formulario hace click <Link to={`/form/${uuid}`}>acá</Link>
					</p>
				}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</>
	);
}
