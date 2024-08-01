import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    categoryContoller,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryContoller,
} from "./../controllers/categoryContoller.js";

const router = express.Router();

// routes
// create category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

// update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryContoller);

// getAll category
router.get('/get-category', categoryContoller)

// single category
router.get('/single-category/:slug', singleCategoryController)

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;
