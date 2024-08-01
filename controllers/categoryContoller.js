import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'Name is required' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already existing'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'new category created',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in category'
        })
    }
};

// update category
export const updateCategoryContoller = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Category Updated successfully',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating category'
        });
    }
};

// get all category

export const categoryContoller = async(req, res) => { 
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
        success:true,
        message: 'All categories list',
        category,
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: "Error while getting all categories"
        })
    }
};

// /`single category contoller

export const singleCategoryController = async(req, res)=> {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get single category success', 
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting Single Category',
            error,
        })
    }
};

// delete category 
export const deleteCategoryController = async(req, res)=>{
    try {
        const{id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message: "Category deleted successfully ",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting Category',
            error,
        })
    }
}