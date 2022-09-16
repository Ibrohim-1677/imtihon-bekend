import { Router } from "express"
import categoriesController from "../controller/categories.controller.js"
import subCotegoryController from "../controller/subCotegory.controller.js"
import productConrtoller from "../controller/product.conrtoller.js"


const router = Router()

router.get('/categories' , categoriesController.Get)
router.get('/categories/:cat_id' , categoriesController.Get)
router.get('/subCategories' , subCotegoryController.Get)
router.get('/subCategories/:cat_id' , subCotegoryController.Get)
router.post('/addProduct'  , productConrtoller.Post)
router.delete('/deliteProduct'  , productConrtoller.Delete)
router.delete('/deliteSubCategories' , subCotegoryController.DELETE)
router.post('/addSubCategories' , subCotegoryController.POST)
router.put('/chengeSubCategories' , subCotegoryController.PUT)
router.put('/changeProduct'  , productConrtoller.Put)




export default router
