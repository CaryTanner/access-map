import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import * as path from 'path'
import limiter from './middleware/rateLimit'
import helmet from 'helmet'
import logResponseTime from './middleware/response-time-logger'

dotenv.config();


const PORT = process.env.PORT || 5000
const db = process.env.MONGODB_URI




const app = express()

app.use(logResponseTime);

//middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
//rate limiter
// app.use('/api', limiter)



//routes
import reportRoutes from './routes/reports'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'

app.use('/api/reports', reportRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)



//serve static routes in production
if(process.env.NODE_ENV === 'production'){
    //set a static folder
    app.use(express.static('../client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false  })
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`server started on ${PORT}`))