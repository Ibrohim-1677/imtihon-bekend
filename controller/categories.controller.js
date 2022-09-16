import { read } from '../utils/modul.js';

const Get = (req , res) =>{
    try {
        let categories = read('categories')
        let subcategories = read('sabCategory')
        let {cat_id } =req.params

        categories.map(categorie => {
            categorie.subcategories = subcategories.filter(category => category.category_id == categorie.category_id)
            return categorie
        })
        subcategories.map(sub => delete sub.category_id)
        if(!cat_id)
        {
            return res.send(categories)
        }

        let findedCategory = categories.find(category => category.category_id == cat_id)
        if (!findedCategory) {
            return res.send("we don't have this category")
        }else{
            return res.send(findedCategory)
        }
    } catch (error) {
        return res.send(error.message)
    }
}
export default  {
    Get
}
