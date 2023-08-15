const router = require('express').Router();

const todoItemsModel = require('../models/todoItem')

router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    } catch (error) {
        res.json(error)
    }
})

router.patch('/api/item/:id', async (req, res) => {
    try {
        const updatedItem = await todoItemsModel.findByIdAndUpdate(
            req.params.id,
            { completed: true }, // Marcar como completado
            { new: true } // Devolver el documento actualizado
        );
        res.status(200).json(updatedItem);
    } catch (error) {
        res.json(error);
    }
});


router.get('/api/item', async (req, res) => {
    try {
        const allTodoItem = await todoItemsModel.find({})
        res.status(200).json(allTodoItem)
    } catch (error) {
        res.json(error)
    }
})

router.delete('/api/item/:id', async (req, res) => {
    try {
        const borrarItem = await todoItemsModel.findByIdAndDelete(req.params.id)
        res.status(200).json(borrarItem)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router