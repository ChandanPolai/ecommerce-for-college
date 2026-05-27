import "dotenv/config";
import connectDB from "./config/mongodb.js";
import productModel from "./models/productModel.js";
import userModel from "./models/userModel.js";
import orderModel from "./models/orderModel.js";

const cleanDB = async () => {
  try {
    console.log("Connecting to database for cleanup...");
    await connectDB();

    console.log("Starting full database cleanup...");

    const productRes = await productModel.deleteMany({});
    console.log(`Deleted ${productRes.deletedCount} products.`);

    const userRes = await userModel.deleteMany({});
    console.log(`Deleted ${userRes.deletedCount} users.`);

    const orderRes = await orderModel.deleteMany({});
    console.log(`Deleted ${orderRes.deletedCount} orders.`);

    console.log("🎉 Database successfully emptied (clean slate)!");
    process.exit(0);
  } catch (error) {
    console.error("Error during database cleanup:", error);
    process.exit(1);
  }
};

cleanDB();
