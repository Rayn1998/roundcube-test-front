class Api {
	constructor(url) {
		this.url = url;
	}

	async _getResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Error: ${res.status}`);
		} else {
			return res.json();
		}
	}

	async _request(url, options) {
		return await fetch(url, options).then(this._getResponse);
	}

	getMessages() {
		return this._request(`${this.url}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	sendMessage(data) {
		return this._request(`${this.url}/message`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
}

const api = new Api('http://127.0.0.1:3001');

export default api;
