const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
let personName
let personNumber 
//Guard to set values to empty string
if(process.argv[3] && process.argv[4] !== null){
	personName = process.argv[3],
	personNumber = process.argv[4]
} else {
	personName = "",
	personNumber = ""
}

const url =
`mongodb+srv://fullstackUser:${password}@cluster0.jsn67ot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

const personSchema = new mongoose.Schema ({
	phonebookName: String,
	phonebookNumber: String
})

// const Note = mongoose.model('Note', noteSchema)
const Person = mongoose.model ('Person', personSchema)

// const note = new Note({
// //   content: 'HTML is easy',
// //   important: true,
// // })

// const generateId = () => {
// 	let maxId
// 	Person.find({}, 'phonebookId')
// 	.then(result => {
// 		const maxIdLength = result.map(person => person.phonebookId)
// 		maxId = Math.max(...maxIdLength);
// 		// console.log('Max ID:', maxId);
// 	mongoose.connection.close
// 	})
// 	return maxId
// }
// generateId()

const person = new Person({
	phonebookName: personName,
	phonebookNumber: personNumber
})

//manually save data through terminal
if(personName && personNumber !== null){
	person.save().then(result => {
		console.log('Phonebook saved!')
		mongoose.connection.close()
	})
} else {
	Person.find({})
	.then(result => {
		console.log("phonebook:")
		result.forEach(person => {
			console.log(person.phonebookName, person.phonebookNumber)
		})
	mongoose.connection.close()
	})
}
