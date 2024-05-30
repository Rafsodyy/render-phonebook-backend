const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to ', url)

mongoose.set('strictQuery', false)


mongoose.connect(url)
	.then(result => {
		console.log('Connected to MongoDB')
	})
	.catch(error => {
		console.log('Error connecting to MongoDB', error.message)
	})

const phonebookSchema = new mongoose.Schema({
  name: {
	type: String,
	minLength: 3,
	required: true,
	validate: { 
		validator: function(name){return /^[a-zA-Z]+$/.test(name)},
		message: props => `${props.value} is not a valid name. It must contain only letters.`
	}
  },	
  number: {
	type: String,
	minLength: 3,
	required: [true, 'Phone number is required'],
	validate: {
		validator: function(num) {return /^\d{2,3}-.*/.test(num)},
		message: props => `${props.value} is not a valid number.`
	},
	validate: {
		validator: function(num){ return num.length >= 8; },
		message: props => `${props.value} must be longer than 8 digits.`
	},
  },
})

phonebookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', phonebookSchema)