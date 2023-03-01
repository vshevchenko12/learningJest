import axios from 'axios';

export default class Users {
	static async all() {
		const resp = await axios.get('/users.json');
		return resp.data;
	}
}

// class Users {
//   static all() {
//     return axios.get('/users.json').then(resp => resp.data);
//   }
// }

// export default Users;
