const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../middleware/apiFeature");


// CREATE PRODUCT ==> ADMIN
const createProduct = catchAsyncError(async(req,res,next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})





// GET ALL PRODUCTS
const getAllProducts = catchAsyncError(async(req,res,next) => {
    // const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
   const apiFeatures = new ApiFeatures(Product.find(),req.query)
   .search()
   .filter()
//    .pagination(resultPerPage)
        const products = await apiFeatures.query;

        res.status(200).json({
            success:true,
            productsCount,
            products,
            // resultPerPage
        })
})





//GET SINGLE PRODUCTS
const getProductDetails = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(200).json({
        success:true,
        product
    })
})




// UPDATE PRODUCTS ==> ADMIN
const updateProducts = catchAsyncError(async(req,res,next) => {
  let product = await Product.findById(req.params.id,req.body);

  if(!product){
    res.status(500).json({
        success:false,
        message:"product not found"
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });


  res.status(200).json({
    success:true,
    product
  });

})



// DELETE PRODUCTS ==> ADMIN
const deleteProduct = catchAsyncError(async(req,res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        res.status(404).json({
            success:false,
            message:"product not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})


// Create New Review or Update the review

const createProductReview = catchAsyncError(async (req, res, next) => {

    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        // productId:req.body.productId
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })

    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    })

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// get all reviews of single product
const getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
   if(!product){
    res.status(404).json({
        success:false,
        message:"Product not found"
    })
   }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// delete reviews
const deleteReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.productId.toString())

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    })

    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(200).json({
        success: true
    })

    res.status(200).json({
        success: true,
    })
})







module.exports = {createProduct,getAllProducts,getProductDetails,updateProducts,deleteProduct,createProductReview,getProductReviews,deleteReviews};