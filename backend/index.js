require('dotenv').config();
const express = require('express');

const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// Register a new node
app.post('/nodes', async (req, res) => {
    try {
        const { hostname, ipAddress } = req.body;
        const node = await prisma.node.create({ data: { hostname, ipAddress } });
        res.status(201).json(node);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// List all nodes
app.get('/nodes', async (req, res) => {
    const nodes = await prisma.node.findMany();
    res.json(nodes);
});

app.listen(4000, () => {
    console.log('Fleet manager API running on http://localhost:4000');
}); 
