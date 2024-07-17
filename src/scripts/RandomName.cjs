const crypto = require('crypto');

const generateRandomName = (input, key) => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		const hash = crypto.createHmac('sha256', key).update(input).digest('hex');
		let result = '';

		for (let i = 0; i < 20; i++) {
				const index = parseInt(hash.substr(i * 2, 2), 16) % characters.length;
				result += characters[index];
		}

		// Convertir le premier caractère en majuscule car React c'est forcément du PascalCase
		result = result.charAt(0).toUpperCase() + result.slice(1);

		return result;
};

module.exports = generateRandomName;