"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSIngleProduct = exports.getAllProducts = exports.postProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
//post product
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, stock, description, collections, sizes } = req.body;
    const product = new productModel_1.default({
        name,
        price,
        stock,
        description,
        collections,
        sizes
    });
    try {
        const createdProduct = yield product.save();
    }
    catch (error) {
        res.status(400).send(error);
    }
    res.status(201).json("new product created");
});
exports.postProduct = postProduct;
// get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find();
    if (!products)
        res.status(404).send({ message: "Products not Found" });
    res.status(200).json(products);
});
exports.getAllProducts = getAllProducts;
// // get all product by user
// const getUserProducts =async (req: Request, res: Response) => {
//     const userId = req.params.id
//     const products = await Product.find({userId:userId}).sort({createdAt:1})
//     if(!products)res.status(404).send({ message: "Products not Found" });
//     res.status(200).json(products)
// }
const getSIngleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const product = yield productModel_1.default.find({ _id: Id });
    if (!product)
        res.status(404).send({ message: "Product not found" });
    res.status(200).json(product);
});
exports.getSIngleProduct = getSIngleProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const product = req.body;
    const updatedProduct = yield productModel_1.default.findByIdAndUpdate(_id, product, { new: true });
    res.status(200).json(updatedProduct);
    console.log("updated product");
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const deletedProduct = yield productModel_1.default.findByIdAndRemove(_id);
    res.status(200).json(deletedProduct);
    console.log("deleted PRODUCT");
});
exports.deleteProduct = deleteProduct;
