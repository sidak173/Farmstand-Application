const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmstand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

app.get('/products', async (req, res) => {
    const category = req.query.category;
    if (category) {
        const products = await Product.find({ category });
        res.render('index', { products, category })

    }
    else {
        const products = await Product.find({});
        res.render('index', { products, category:'All' })
    }
})
app.get('/products/new', (req, res) => {
    res.render('new');
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        console.log(product)
        res.render('product', { product })
    }
    catch {
        res.send("wrong id")
    }
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/products/${id}`);
})
app.post('/products', async (req, res) => {
    const p = new Product(
        req.body
    )
    await p.save();
    const products = await Product.find({});
    res.redirect('/products')
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product });
})
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("app listening port 3000!")
})

