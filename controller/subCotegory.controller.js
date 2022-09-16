import { read , write } from '../utils/modul.js';

const Get = (req , res) =>{
    try {
        let subcategories = read('sabCategory')
        let product = read('product')
        let {cat_id } =req.params

        subcategories.map(categorie => {
            categorie.product = product.filter(category => category.sub_category_id == categorie.sub_category_id)
            return categorie
        })
        product.map(sub => delete sub.sub_category_id)
        if(!cat_id)
        {
            return res.send(subcategories)
        }

        let findedCategory = subcategories.find(category => category.sub_category_id == cat_id)
        if (!findedCategory) {
            return res.send("we don't have this category")
        }else{
            return res.send(findedCategory)
        }
    } catch (error) {
        return res.send(error.message)
    }
}
const POST = (req, res) => {
    try {
        let sub_categories = read('sabCategory')
        let categories = read('categories')
        let { category_id, sub_category_name } = req.body

        let findCategory = categories.find(category => category.category_id == category_id)

        if (!findCategory) {
            return res.send('sub category not found')
        }

        let newSub_category = {
            category_id,
            sub_category_id: sub_categories.at(-1).sub_category_id + 1 || 1,
            sub_category_name
        }

        sub_categories.push(newSub_category)
        write('sabCategory', sub_categories)
        return res.status(201).json({
            status: 201,
            mesage: "created",
            data: newSub_category
        })

    } catch (error) {
        return res.send(error.message)
    }
}

const PUT = (req, res) => {
    try {
        let sub_categories = read('sabCategory')
        let { sub_category_id, sub_category_name, category_id } = req.body

        let findSubs = sub_categories.find(subs => subs.sub_category_id == sub_category_id)
        if (!findSubs) {
            res.status(404).json({
                status: 404,
                message: "product id not found"
            })
        }

        if (!sub_category_name && !category_id && !model) {
            res.status(203).json({
                status: 203,
                message: "nothing to change"
            })
        }

        findSubs.sub_category_name = sub_category_name ? sub_category_name : findSubs.sub_category_name
        findSubs.category_id = category_id ? category_id : findSubs.category_id

        write('sabCategory', sub_categories)
        res.status(201).json({
            status: 201,
            message: "changed",
            data: {
                sub_category_name,
                category_id
            }
        })

    } catch (error) {
        return res.send(error.message)
    }
}

const DELETE = (req, res) => {
    try {
        let sabCategory = read('sabCategory')
        let { sub_category_id } = req.body

        let findSub_cat = sabCategory.find(sub => sub.sub_category_id == sub_category_id)
        if (findSub_cat) {
            sabCategory = sabCategory.filter(sub => sub.sub_category_id == sub_category_id)
            write('sabCategory', sabCategory)
            res.status(202).json({
                status: 204,
                message: "deleted"
            })
        }
        res.status(404).json({
            status: 404,
            message: "id not found"
        })
    } catch (error) {
        return res.send(error.message)
    }
}

export default  {
  
    POST,
    Get ,
    PUT,
    DELETE
}