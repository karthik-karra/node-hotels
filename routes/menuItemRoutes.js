const express = require('express')
const router = express.Router();

const menuItem = require('./../models/menuItem');

router.get('/', async(req,res)=>{
    try{
        const response = await menuItem.find();
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:tasteType', async(req,res)=>{
    try{
        const taste_type = req.params.tasteType;
        if(taste_type == 'sweet' || taste_type == 'sour' || taste_type == 'spicy'){
            const response = await menuItem.find({taste: taste_type});
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const newMenuItem = new menuItem(data);
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const idToUpdate = req.params.id;
        const newData = req.body;
        const response = await menuItem.findByIdAndUpdate(idToUpdate, newData, {
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: 'Menu Item not found'});
        }
        else{
            res.status(200).json(response);
        }
    }
    catch(err){
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const idToDelete = req.params.id;
        const response = await menuItem.findByIdAndDelete(idToDelete);
        if(!response){
            return res.sendStatus(404).json({error: 'Id not found'});
        }
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;












router.put('/', async(req,res)=>{
    try{
        const data = req.body;

        const newMenuItem = new menuItem(data);

        const response = await newMenuItem.save();
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})
