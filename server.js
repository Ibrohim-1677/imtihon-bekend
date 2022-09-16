import  express  from "express";
import router from "./router/router.js";
import { read } from './utils/modul.js';

const app = express()
app.use(express.json())
app.use(router)

    app.get('/categories' , (req ,res) => {
        let categories = read('categories')
        res.send(categories)
    })
    app.get('/subCategories' , (req ,res) => {
        let categories = read('sabCategory')
        res.send(categories)
    })



    app.listen(5000 , () => console.log("server running http://localhost:5000"))