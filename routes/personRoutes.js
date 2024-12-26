const express = require('express');
const router = express.Router();

const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async(req,res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response= await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// GET method to get the person
router.get('/', async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// parametrized GET request to get person of specific worktype
router.get('/:work', async(req,res)=>{
    try{
        const workType = req.params.work; // extract work from URL parser
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(200).json({error: 'Internal server error'});
    }
})

// update person using PUT method
router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const idToDelete = req.params.id;
        const response = await Person.findByIdAndDelete(idToDelete);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('person deleted');
        res.status(200).json(response);
    }
    catch(err){
        // console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;
