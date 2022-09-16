import { read , write} from "../utils/modul.js"

const Post = (req, res) => {
    try {
        let products = read('product')
        let { sub_category_id, model, product_name, price, color } = req.body
        let sub_categories = read('sabCategory')

        let findProduct = sub_categories.find(subs => subs.sub_category_id == sub_category_id)

        if (!findProduct) {
            return res.send('sub category not delited')
        }
        let newProduct = {
            sub_category_id,
            product_id: products.at(-1).product_id + 1 || 1,
            model,
            product_name,
            color,
            price
        }

        products.push(newProduct)
        write('products', products)
        return res.status(201).json({
            status: 201,
            mesage: "created",
            data: newProduct
        })

    } catch (error) {
        return res.send(error.message)
    }
}

const Delete = (req, res) => {
    try {
        let products = read('product')
        let { product_id } = req.body

        let findProduct = products.find(product => product.product_id == product_id)
        if (findProduct) {
            products = products.filter(product => product.product_id != product_id)
            write('product', products)
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

    }
}

const Put = ( req ,res ) => {
    try {
        let product = read ("product")
        let { product_id , product_name , price , model} = req.body

        let findedProduct = product.find(product => product.product_id == product_id)
        if (!findedProduct) {
            res.status(404).json({
                status: 404,
                mesage: "product not chenged"
            })
        }
        if (!product_name && !price && !model) {
            res.status(203).json({
                status: 203,
                mesage: "product chenged"
            })
        }

        findedProduct.product_name = product_name ? product_name : findedProduct.product_name
        findedProduct.price = price ? price : findedProduct.price
        findedProduct.model = model ? model : findedProduct.model

        write('product' , product)
        res.status(201).json({
            status: 201,
            mesage: 'nice chenged',
            data: {
                product_name,
                price
            }
        })
    } catch (error) {
        return res.send(error.mesage)
    }
}

export default { Post , Delete ,Put }