import "dotenv/config";
import connectDB from "./config/mongodb.js";
import productModel from "./models/productModel.js";

const products = [
  {
    name: "Men's Classic Chambray Button-Down",
    description: "A timeless chambray shirt woven from ultra-soft cotton, featuring dual chest pockets, a button-down collar, and a modern tailored silhouette.",
    price: 1299,
    image: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Men's Performance Athletic Crewneck",
    description: "Lightweight and moisture-wicking active t-shirt engineered for extreme comfort and peak athletic performance. Built from quick-dry performance stretch mesh.",
    price: 599,
    image: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Men's Tailored Linen Summer Shirt",
    description: "Stay cool and sharp with this breathable, long-sleeve pure linen shirt, featuring relaxed cuffs and a classic buttoned placket.",
    price: 1499,
    image: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Men's Minimalist Plain Polo Shirt",
    description: "Premium piqué knit cotton polo shirt offering a clean aesthetic. Crafted with a reinforced flat-knit collar and three-button closure.",
    price: 899,
    image: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Men's Slim-Fit Stretch Denim Jeans",
    description: "Classic five-pocket slim jeans made from vintage-washed indigo denim with a touch of elastane for maximum flex and comfort.",
    price: 1999,
    image: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["30", "32", "34", "36"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Men's Modern Chino Trousers",
    description: "Streamlined modern chinos crafted from durable stretch cotton twill. Features front slant pockets and button-through back welt pockets.",
    price: 1499,
    image: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["30", "32", "34", "36"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Men's Drawstring Cargo Joggers",
    description: "Utility meets comfort. Features a ribbed elastic waistband, premium thick drawstrings, and secure cargo pockets at the thighs.",
    price: 1199,
    image: [
      "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Men's Classic Suede Bomber Jacket",
    description: "Luxuriously soft genuine suede bomber featuring rib-knit trims at the collar, cuffs, and hem. Includes practical inside slip pockets.",
    price: 4999,
    image: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Men's Double-Breasted Wool Overcoat",
    description: "Stately double-breasted coat made from a heavyweight premium wool blend. Exquisitely structured silhouette with peak lapels.",
    price: 5499,
    image: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Men's Rugged Corduroy Trucker Jacket",
    description: "Vintage-inspired trucker jacket constructed from durable mid-weight corduroy, lined with plush, thermal-insulating sherpa fleece.",
    price: 2799,
    image: [
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Women's Bohemian Floral Sundress",
    description: "Flowy summer sundress in a beautiful floral pattern, boasting an adjustable tie-front keyhole bodice and elegant ruffled hemline.",
    price: 1599,
    image: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Women's Silk Wrap Blouse",
    description: "An elegant wrap blouse made from pure silk satin, featuring dramatic bishop sleeves and a customizable self-tie sash at the waist.",
    price: 1899,
    image: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["XS", "S", "M", "L"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Women's Linen Ruffle-Sleeve Top",
    description: "Charming casual top woven from premium pre-washed linen, styled with feminine flutter sleeves and an easy round neckline.",
    price: 999,
    image: [
      "https://images.unsplash.com/photo-1564585299999-159fe4db39f7?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Women's Pleated Satin Midi Skirt",
    description: "Catch the light with this high-waisted pleated midi skirt, boasting a soft elastic waistband and a gorgeous glossy satin drape.",
    price: 1399,
    image: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Women's High-Rise Crepe Trousers",
    description: "Ultra-chic straight-leg trousers tailored in premium crepe. Designed with structured front pressed creases and comfortable side pockets.",
    price: 1699,
    image: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Women's Vintage Indigo Skinny Jeans",
    description: "Flattering high-rise skinny jeans in a deep indigo wash. Built from heavy-duty stretch denim that holds its shape all day long.",
    price: 2199,
    image: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["26", "28", "30", "32"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Women's Classic Wool Trench Coat",
    description: "The ultimate layering piece. Features a double-breasted closure, sharp notched lapels, a buckled waist belt, and deep buttoned hand pockets.",
    price: 4599,
    image: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Women's Cable-Knit Cashmere Sweater",
    description: "Supremely cozy crewneck sweater knitted from a soft cashmere-wool blend in a timeless textured cable pattern.",
    price: 2999,
    image: [
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Women's Pastel Sherpa Fleece Jacket",
    description: "Incredibly plush sherpa fleece jacket with a relaxed zip-front design. Features contrast zip chest pocket and soft jersey lining.",
    price: 2299,
    image: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Kids' Cotton Stripe Long-Sleeve Tee",
    description: "Vibrant and durable long-sleeve tee crafted from extra-thick ring-spun cotton. Perfect for active playdates.",
    price: 499,
    image: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Kids' Unisex Cotton Stretch Joggers",
    description: "Cozy knit cotton-fleece joggers featuring an adjustable drawstring waistband, deep utility pockets, and ribbed ankle cuffs.",
    price: 699,
    image: [
      "https://images.unsplash.com/photo-1519457431-44cac64a5d9a?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Kids' Lightweight Quilted Puffer",
    description: "Water-resistant quilted puffer jacket insulated with high-loft synthetic down. Highly compressible and lightweight.",
    price: 1799,
    image: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Kids' Printed Cotton Pyjama Set",
    description: "Dream big in this super-soft, flame-resistant organic cotton pajama set, styled with elastic cuffs and playful starry night prints.",
    price: 899,
    image: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Kids' Heavywash Denim Chore Coat",
    description: "A rugged, classic mini chore coat styled in heavy stonewashed cotton denim with metal shank buttons and front patch pockets.",
    price: 1599,
    image: [
      "https://images.unsplash.com/photo-1519457187-4467000e3049?w=600&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    bestseller: false,
    date: Date.now()
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to database for seeding...");
    await connectDB();

    console.log("Cleaning existing products...");
    await productModel.deleteMany({});
    console.log("Existing products deleted.");

    console.log(`Inserting ${products.length} highly professional premium products...`);
    await productModel.insertMany(products);
    console.log("🎉 Database successfully seeded with top-tier fashion products!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

seedDB();
