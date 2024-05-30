// const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// let password = process.argv[2]
// let phonebookName
// let phonebookNumber 

// //Guard to set values to empty string
// if(process.argv[3] && process.argv[4] !== null){
// 	phonebookName = process.argv[3],
// 	phonebookNumber = process.argv[4]
// } else {
// 	phonebookName = "",
// 	 phonebookNumber = ""
// }



// const url =
// `mongodb+srv://fullstackUser:${password}@cluster0.jsn67ot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery',false)

// mongoose.connect(url)

// const phonebookSchema = new mongoose.Schema({
//   name: String,	
//   number: String,
// })

// const Person = mongoose.model('Person', phonebookSchema)

// const person = new Person({
// 	name: phonebookName,
// 	number: phonebookNumber,
// })

// if (phonebookName.length && phonebookNumber.length !== null){
// 	person.save().then(result => {
// 		console.log(`added ${person.name} number ${person.number} to phonebook`)
// 		mongoose.connection.close()
// 	})
// } else {
// 	Person.find({})
// 	.then( result => {
// 		console.log("phonebook:")
// 		result.forEach(person => {
// 			console.log(person.name, person.number)
// 		})
// 	mongoose.connection.close()
// 	})
// }


