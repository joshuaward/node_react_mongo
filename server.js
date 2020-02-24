const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/App', {
	useNewUrlParser: true,
	useUnifiedTopology: true,

});

// CREATE MONGOOSE SCHEME AND MODEL
const carSchema = mongoose.Schema({
	make: String,
	model: String,
	year: Number,
	avail: Boolean,
});

const Car = mongoose.model('Car', carSchema);
// ////////////////////////////////

app.post('/api/addcar', (req, res) => {

	const addCar = new Car({
		make: req.body.make,
		model: req.body.model,
		year: req.body.year,
		avail: req.body.avail,
	})

	addCar.save((err, doc) => {
		if(err)  return console.log(err)
		res.sendStatus(200);
	})
})

app.get('/api/getcars', (req, res) => {
	Car.find((err, doc) => {
		if(err) return console.log(err);
		res.json(doc);
	})
})

app.post('/api/removecar', (req, res) => {
	const id = req.body.id;
	const make = req.body.make;
	Car.remove({},(err, doc) => {
		if(err) return console.log(err);
		res.json(doc)
	})
})

app.post('/api/updatecar', (req, res) => {
	const id = req.body.id;
	const make = req.body.make;

	Car.findById(id,(err, car) => {
		if(err) return console.log(err);
		
		car.set({
			make: make
		})
		car.save((err, doc) => {
			if(err) return console.log(err);
			res.json();
		})
	})
	
	// Car.findByIdAndUpdate(id, {$set: {
	// 	model: model
	// }},
	// {new: false},
	// (err, doc) => {
	// 	if(err) return console.log(err);
	// 	console.log(doc)
	// 	res.json(doc)
	// })
})


const port = process.env.PORT || 3001;

app.listen(port);