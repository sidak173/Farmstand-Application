const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmstand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

// for seeding the database inserting to databse

const p = new Product(
    {
        name: 'Ruby Grapefruit',
        price: 1.99,
        category: 'fruit'
    }
)
p.save().then(p => {
    console.log(p)
})
    .catch(e => {
        console.log("error", e);
    })

const parr=[
    {
        name:'apple',
        price:1,
        category:'fruit'
    },
    {
        name:'brocoli',
        price:2,
        category:'vegetable'
    },
    {
        name:'milk',
        price:3,
        category:'dairy'
    },
    {
        name:'curd',
        price:4,
        category:'dairy'
    },
    {
        name:'olive',
        price:2.5,
        category:'vegetable'
    },
    {
        name:'lemon',
        price:1.7,
        category:'vegetable'
    }
]

Product.insertMany(parr).then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})
