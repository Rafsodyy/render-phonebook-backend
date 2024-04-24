const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	.then(result => {
		console.log('Connected to MongoDB')
		console.log('The database is running to the server')
	})
	.catch(error => {
		console.log('Error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema ({
  phonebookName: String,
  phonebookNumber: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)