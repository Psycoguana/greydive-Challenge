import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';

import config from './config';

export function writeToDatabase(data, uuid) {
	initializeApp(config);

	const db = getDatabase();
	console.log(uuid);
	console.log(data);
	set(ref(db, 'users/' + uuid), data);
}

export async function readFromDatabase(uuid) {
	initializeApp(config);

	const dbRef = ref(getDatabase());
	const snapshot = await get(child(dbRef, `users/${uuid}`));
	return snapshot.exists() ? snapshot.val() : {};
}
