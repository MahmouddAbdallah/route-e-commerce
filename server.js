const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/middleware/connectDB');
const authRouter = require('./src/routers/authRouter');
const categoryRouter = require('./src/routers/categoryRouter');
const productRouter = require('./src/routers/productRouter');
const cartRouter = require('./src/routers/cartRouter');
const userRouter = require('./src/routers/userRouter');

//create app
const app = express();


//middleware 
dotenv.config({ path: './.env' });
app.use(morgan('dev'));
app.use(express.json());

//idenify folder images.
app.use(express.static('./src/images'))

//routes
app.use('/auth', authRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', userRouter)

//connect db
connectDB();

//listen to app
const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`server run at ${PORT}`);
})