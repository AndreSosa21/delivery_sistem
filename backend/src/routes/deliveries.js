import express from 'express';
const route_deliveries = express.Router();
import { users } from './users.js';

// default deliveries for testing
// in real applications, this data would come from a database (MySQL)
export let deliveries = [
    {
        id: 1,
        username:"Andrea",
        item:"Hamburguesa",
        quantity: 2,
        price: 35000,
        address:"Cra 45 #4-09"
    }       
];

// Function to validate if all inputs are strings
function string_validation(username,item,address) {
    let data = [username, item, address];
    return data.every(item => typeof item === 'string');
}
// function to validate int inputs
function int_validation(quantity, price) {
    let data_numbers = [quantity, price];
    return data_numbers.every(num => typeof num === 'number');
}

// GET all deliveries
route_deliveries.get('/', (req, res) => {
    try {
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, could not GET deliveries' });
    }   
});

// POST delivery
route_deliveries.post('/', (req, res) => {
    
    try {
        const { username, item, quantity, price, address } = req.body;
        
        // Validate if all required fields are present
        if (!username || !item || !quantity || !price || !address) {
            return res.status(400).json({ error: 'JSON incomplete' });
        }
        // Validate type of data
        if (!string_validation(username,item,address) || !int_validation(quantity, price)) {
            return res.status(400).json({ error: 'type of data invalid' });
        }
        // Validate if username exists
        if (!users.some(u => u.username === username)) {
            return res.status(400).json({ message: "username does not exist" });
        }
        // Generate new id
        const newId = deliveries.length > 0 ? Math.max(...deliveries.map(d => d.id)) + 1 : 1;
        const newDelivery = { id: newId, username, item, quantity, price, address };
        deliveries.push(newDelivery);
        return res.json({ message: "Delivery added", delivery: newDelivery });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, could not POST delivery' });
    }
});

// PUT delivery
route_deliveries.put('/:id', (req, res) => {
    try {

        const deliveryId = parseInt(req.params.id);
        const { username, item, quantity, price, address } = req.body;

        const index = deliveries.findIndex(d => d.id === deliveryId);
        if (index < 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        // Validate if all required fields are present
        if (!username || !item || !quantity || !price || !address) {
            return res.status(400).json({ error: 'JSON incomplete' });
        }   
        // Validate type of data
        if (!string_validation(username, item, address) || !int_validation(quantity, price)) {
            return res.status(400).json({ error: 'type of data invalid' });
        }
        // Validate if username exists
        if (!users.some(u => u.username === username)) {
            return res.status(400).json({ message: "username does not exist" });
        }
        const updatedDelivery = { id: deliveryId, username, item, quantity, price, address };
        deliveries[index] = updatedDelivery;
        return res.json({ message: "Delivery updated", delivery: updatedDelivery });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, could not PUT delivery' });
    }
});
// DELETE delivery
route_deliveries.delete('/:id', (req, res) => {
    try { 
        const deliveryId = parseInt(req.params.id);
        const index = deliveries.findIndex(d => d.id === deliveryId);
        if (index < 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        const deletedDelivery = deliveries.splice(index, 1);
        return res.json({ message: "Delivery deleted", delivery: deletedDelivery[0] });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error, could not DELETE delivery' });
    }   
});

export default route_deliveries;
