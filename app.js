const express = require('express')
const mongoose = require('mongoose')
const Launch = require('./launch/launchModel')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json())

require('dotenv').config()
// console.log(process.env) 


// Routes
app.get('/', (req, res) => {
    res.send('Just sayin,' + ' Hello.')
})




app.post('/launches', async (req, res) => {
    try {
        const launch = await Launch.create(req.body)
        res.status(201).json(launch);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/launches', async (req, res) => {
    try {
        const launches = await Launch.find({})
        res.status(200).json(launches);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/launches/:id', async (req, res) => {
    try {
        const launch = await Launch.findById(req.params.id)
        res.status(200).json(launch);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/launches/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const launch = await Launch.findByIdAndUpdate(id, req.body, { new: true }); // add { new: true } to return the updated document
        if(!launch){
            return res.status(404).json({message: 'Launch not found'})
        }
        const updatedLaunch = await Launch.findByIdAndUpdate(id);
        res.status(200).json(launch); // send the updated launch back to the client

    } catch (error) {
        res.status(500).json({message: error.message})
    } 
})

app.delete('/launches/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const launch = await Launch.findByIdAndDelete(id);
        if(!launch){
            return res.status(404).json({message: 'Launch not found'})
        }
        res.status(200).json({message: 'Launch deleted successfully'})

    } catch (error) {
        res.status(500).json({message: error.message})
    } 
}   )


mongoose.set("strictQuery", false) //Gets rid of the deprecation warning
mongoose.
connect('mongodb+srv://{dotenv}:{dotenv}@{dotenv}.t77dtls.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    });
}).catch(err => console.log(err))

