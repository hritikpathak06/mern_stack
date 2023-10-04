const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../model/orderModel");

// CREATE ORDER
const createOrder = catchAsyncError(async (req, res) => {

    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })

})

// GET SINGLE ORDER
const getSingleOrder = catchAsyncError(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "username email"
    );
    if (!order) {
        res.status(404).json({
            success: false,
            message: "Order not found"
        })
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in User Order
const myOrders = catchAsyncError(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        orders
    })
})

// GET ALL ORDRS
const getAllOrders = catchAsyncError(async (req, res) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// UPDATE ORDER ==> ADMIN
// const updateOrder = catchAsyncError(async (req, res) => {
//     const order = await Order.find(req.params.id);

//     if (order.orderStatus === "Delivered") {
//         res.status(404).json({
//             success: false,
//             message: "You have already delived this order"
//         })
//     }
// })
// order.orderItems.forEach(async (order) => {
//     await updateStock(order.product, order.quantity);
// })

// order.orderStatus = req.body.status;

// if (req.body.status === "Deliverd") {
//     order.deliveredAt = Date.now()
// }

// await order.save({ validateBeforeSave: false })

// res.status(200).json({
//     success: true
// })


// async function updateStock(id,quantity){
//     const product = await Product.findById(id);
//     product.stock -= quantity;
//      await product.save({validateBeforeSave:false})
// }

// DELETE ORDER
const deleteOrder = catchAsyncError(async(req,res) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })
})




module.exports = { createOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder };