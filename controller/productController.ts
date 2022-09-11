import { Request, Response } from "express"
import Product from '../models/productModel';

//post product
export const postProduct = async (req: Request, res: Response) => {
    const {
        name,
        price,
        stock,
        description,
        collections,
        sizes
    
    } = req.body
    const product = new Product({
        name,
        price,
        stock,
        description,
        collections,
        sizes

    })

    try {

        const createdProduct = await product.save();
    } catch (error) {
        res.status(400).send(error)
    }
    res.status(201).json("new product created")
}
// get all products

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find()
    if (!products) res.status(404).send({ message: "Products not Found" });
    res.status(200).json(products)
}
// // get all product by user
// const getUserProducts =async (req: Request, res: Response) => {
//     const userId = req.params.id
//     const products = await Product.find({userId:userId}).sort({createdAt:1})
//     if(!products)res.status(404).send({ message: "Products not Found" });
//     res.status(200).json(products)

// }



export const getSIngleProduct = async (req:Request,res:Response) => {
    const Id = req.params.id
    const product = await Product.find({_id:Id})
    if(!product) res.status(404).send({message:"Product not found"})
    res.status(200).json(product)
}


export const updateProduct = async (req:Request,res:Response) => {
    const {id:_id} = req.params
    const product = req.body
    const updatedProduct = await Product.findByIdAndUpdate(_id,product, { new: true });
    res.status(200).json(updatedProduct);
    console.log("updated product");

}


export const deleteProduct = async (req:Request,res:Response) => {
    const { id: _id } = req.params;
      const deletedProduct = await Product.findByIdAndRemove(_id);
      res.status(200).json(deletedProduct);
      console.log("deleted PRODUCT");
    
  };