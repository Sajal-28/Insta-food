const { json } = require('express')
const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service')
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')
const { v4: uuid } = require('uuid')

async function createFood(req, res) {

    const file = req.file.buffer.toString('base64');
    const fileName = `video_${uuid()}`

    const fileUploadResult = await storageService.uploadFile(file, fileName)

    const fooditem = await foodModel.create({
        name: req.body.name,
        video: fileUploadResult.url,
        description: req.body.description,
        foodPartner: req.foodPartner
    })

    res.status(201).json({
        message: "Food Created Successfully",
        fooditem
    })

}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "Food Items Fetched Successfully",
        foodItems
    })
}

async function likeFood(req, res) {
    const { foodId } = req.body
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food Unliked Successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food Liked Successfully",
        like
    })
}

async function saveFood(req, res) {
    const { foodId } = req.body
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        })

        return res.status(200).json({
            message: "Food UnSaved Successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: 1 }
    })

    res.status(201).json({
        message: "Food Saved Successfully",
        save
    })
}

async function getSavedFood(req, res) {
    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if(!savedFoods || savedFoods.length === 0){
        return res.status(404).json({
            message: "No Saved Food Found"
        })
    }

    res.status(200).json({
        message: "Saved foods retrieved succesfully",
        savedFoods
    })
}

module.exports = { createFood, getFoodItems, likeFood, saveFood, getSavedFood } 