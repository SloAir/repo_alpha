const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema   = mongoose.Schema;

class User {
	#username;
	// #password;
	#email;
	#profilePicture;
	#queries;
	#aura;

	constructor(username, email, profilePicture, queries, aura) {
		this.#username = username;
		this.#email = email;
		// this.#profilePicture = profilePicture;
		this.#profilePicture = "/images/profile_pictures/default.jpg";
		this.#queries = queries;
		this.#aura = aura;
	}
}

const userSchema = new Schema({
	'username': {
		type: String,
		required: true,
		unique: true
	},
	'password': {
		type: String,
		required: true
	},
	'userData': {
		'firstName': { type: String },
		'lastName': { type: String },
		'email': {
			type: String,
			unique: true
		},
		'phoneNumber': { type: String },
	},
	// path to the profile picture
	'profilePicture': { type: String },
	/*
	'profilePicture': {
		'data': {
			type: Buffer,
			required: true,
			validate: [
				(data) => data.length <= 2 * 1024 * 1024,
				'Profile picture exceeds size limit (2MB).'
			]
		},
		contentType: {
			type: String,
			required: true,
			enum: ['image/jpeg', 'image/png']
		}
	}
	*/
	// same as 'karma' on Reddit
	'aura': { type: Number }
});

userSchema.pre('save', function(next) {
	let user = this;
	bcrypt.hash(user.password, 10, (err, hash) => {
		if(err) {
			return next(err);
		}
		user.password = hash;
		next();
	})
});

module.exports = mongoose.model('user', userSchema);
