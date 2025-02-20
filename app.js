// console.log("Jai Siya Ram")
const express = require('express');
const app = express()
const cors = require('cors');
const path = require('path')
const ProductRouter = require('./src/router/ProductRouter');
const CategoryRouter = require('./src/router/CategoryRouter');
const AdminAccRouter = require('./src/router/AdminAccountRouter');
const SubCatRouter = require('./src/router/SubCategoryRouter');
const SubsubcatRouter = require('./src/router/SubSUbCatRouter');
const SliderRouter = require('./src/router/SliderRouter');
const NotificationRouter = require('./src/router/NotificationRouter');
const CustumerRouter = require('./src/router/CustomerRouter');
const CartRouter = require('./src/router/CarRouter');
const OrderRouter = require('./src/router/OrdersRouter');
const PaymentRouter = require('./src/router/PaymentRouter');

const { query, validationResult, matchedData ,body } = require('express-validator')

app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/image', express.static('./public/upload'))

app.get("/karonasaiyacall", async function (req, res) {
    const re = await fetch("https://reqres.in/api/users?page=2")
    const data = await re.json();

    res.json({
        message: "karona",
        data: data
    })
})
app.get('/api/download', async (req, res) => {
    const downloadFile = __dirname + '/public/upload/record.mp4'
    res.download(downloadFile)
})


//delpoye react in node
app.use(express.static(path.join(__dirname, 'build')));
app.use("/assets", express.static('./public/static'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use('/api/auth', AdminAccRouter);
app.use('/api/auth/customer', CustumerRouter)
app.use('/api/product', ProductRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/order', OrderRouter);
app.use('/api/payment', PaymentRouter);
app.use('/api/subcategory', SubCatRouter);
app.use('/api/subsubdcat', SubsubcatRouter);
app.use('/api/cart', CartRouter)
app.use('/api/slider', SliderRouter);
app.use('/api/notification', NotificationRouter);

app.get('/arun', query('arun').notEmpty().escape(), function (req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const data = matchedData(req)
        console.log(data.arun)
        return res.send(`Hello, ${data.arun}!`);
        // return res.end()
    }
    res.send({ errors: result.array() });
})


app.post('/signup', body('email').isEmail(), body('password').notEmpty(), (req, res) => {
    const result =validationResult(req)
    if(result.isEmpty()){
        const data = matchedData(req, { onlyValidData: false });
        return res.send(data) 
    }
    return res.send({errors:result.array()})
      
    // => { email: 'not_actually_an_email', password: '' }
  });
// app.use('api/paymnet')
module.exports = app

