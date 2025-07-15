import { batchAddProducts } from '../Firebase/products';

// Sample products data
const sampleProducts = [
    // Fashion items
    {
        name: "Classic Cotton T-Shirt",
        category: "fashion",
        description: "Comfortable cotton t-shirt perfect for everyday wear",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1633966887768-64f9a867bdba?w=500&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Gray", "Navy"],
        type: "fashion",
        ratings: 4.5,
        isAvailable: true,
        stock: 100
    },
    {
        name: "Denim Jeans",
        category: "fashion",
        description: "Premium quality denim jeans with perfect fit",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Blue", "Black", "Light Blue"],
        type: "fashion",
        ratings: 4.3,
        isAvailable: true,
        stock: 75
    },
    {
        name: "Summer Dress",
        category: "fashion",
        description: "Elegant summer dress for casual and formal occasions",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Red", "Blue", "Black", "White"],
        type: "fashion",
        ratings: 4.7,
        isAvailable: true,
        stock: 50
    },
    {
        name: "Running Sneakers",
        category: "fashion",
        description: "Comfortable running sneakers for sports and casual wear",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop",
        sizes: ["7", "8", "9", "10", "11"],
        colors: ["White", "Black", "Red", "Blue"],
        type: "fashion",
        ratings: 4.6,
        isAvailable: true,
        stock: 60
    },
    {
        name: "Leather Jacket",
        category: "fashion",
        description: "Genuine leather jacket with modern design",
        price: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown", "Tan"],
        type: "fashion",
        ratings: 4.8,
        isAvailable: true,
        stock: 30
    },
    {
        name: "Formal Shirt",
        category: "fashion",
        description: "Professional formal shirt for business occasions",
        price: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Blue", "Black", "Gray"],
        type: "fashion",
        ratings: 4.4,
        isAvailable: true,
        stock: 80
    },
    {
        name: "Casual Shorts",
        category: "fashion",
        description: "Comfortable cotton shorts for summer",
        price: 34.99,
        imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Khaki", "Navy", "Black", "Gray"],
        type: "fashion",
        ratings: 4.2,
        isAvailable: true,
        stock: 90
    },
    {
        name: "Winter Coat",
        category: "fashion",
        description: "Warm winter coat with hood and insulation",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Gray", "Brown"],
        type: "fashion",
        ratings: 4.7,
        isAvailable: true,
        stock: 40
    },
    {
        name: "High Heels",
        category: "fashion",
        description: "Elegant high heel shoes for formal events",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop",
        sizes: ["6", "7", "8", "9", "10"],
        colors: ["Black", "Red", "Nude", "Silver"],
        type: "fashion",
        ratings: 4.5,
        isAvailable: true,
        stock: 50
    },
    {
        name: "Baseball Cap",
        category: "fashion",
        description: "Classic baseball cap with adjustable strap",
        price: 19.99,
        imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop",
        sizes: ["One Size"],
        colors: ["Black", "White", "Red", "Blue", "Gray"],
        type: "fashion",
        ratings: 4.3,
        isAvailable: true,
        stock: 120
    },

    // Electronics
    {
        name: "Wireless Headphones",
        category: "electronics",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.4,
        isAvailable: true,
        stock: 30
    },
    {
        name: "Smartphone",
        category: "electronics",
        description: "Latest smartphone with advanced camera and performance",
        price: 699.99,
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.8,
        isAvailable: true,
        stock: 25
    },
    {
        name: "Gaming Laptop",
        category: "electronics",
        description: "High-performance gaming laptop with RGB keyboard",
        price: 1299.99,
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.5,
        isAvailable: true,
        stock: 15
    },
    {
        name: "Smart Watch",
        category: "electronics",
        description: "Feature-rich smartwatch with health monitoring",
        price: 249.99,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.2,
        isAvailable: true,
        stock: 40
    },
    {
        name: "Bluetooth Speaker",
        category: "electronics",
        description: "Portable Bluetooth speaker with deep bass",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.3,
        isAvailable: true,
        stock: 60
    },
    {
        name: "Gaming Mouse",
        category: "electronics",
        description: "Precision gaming mouse with customizable RGB lighting",
        price: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.6,
        isAvailable: true,
        stock: 80
    },
    {
        name: "Tablet",
        category: "electronics",
        description: "10-inch tablet perfect for work and entertainment",
        price: 349.99,
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.4,
        isAvailable: true,
        stock: 35
    },
    {
        name: "Wireless Earbuds",
        category: "electronics",
        description: "True wireless earbuds with charging case",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.5,
        isAvailable: true,
        stock: 70
    },
    {
        name: "4K Webcam",
        category: "electronics",
        description: "Ultra HD webcam for professional video calls",
        price: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.7,
        isAvailable: true,
        stock: 45
    },
    {
        name: "Power Bank",
        category: "electronics",
        description: "20000mAh portable charger with fast charging",
        price: 39.99,
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "electronics",
        ratings: 4.3,
        isAvailable: true,
        stock: 90
    },

    // Kitchen items
    {
        name: "Coffee Maker",
        category: "kitchen",
        description: "Automatic drip coffee maker for perfect morning brew",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.3,
        isAvailable: true,
        stock: 35
    },
    {
        name: "High-Speed Blender",
        category: "kitchen",
        description: "Professional blender for smoothies and food preparation",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.6,
        isAvailable: true,
        stock: 28
    },
    {
        name: "Air Fryer",
        category: "kitchen",
        description: "Digital air fryer for healthy cooking without oil",
        price: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1610736461842-4d8b5104b1c8?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.7,
        isAvailable: true,
        stock: 40
    },
    {
        name: "Stand Mixer",
        category: "kitchen",
        description: "Professional stand mixer for baking and cooking",
        price: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.8,
        isAvailable: true,
        stock: 20
    },
    {
        name: "Chef's Knife Set",
        category: "kitchen",
        description: "Professional knife set with wooden block",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.5,
        isAvailable: true,
        stock: 50
    },
    {
        name: "Rice Cooker",
        category: "kitchen",
        description: "Digital rice cooker with steamer basket",
        price: 69.99,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.4,
        isAvailable: true,
        stock: 60
    },
    {
        name: "Cast Iron Skillet",
        category: "kitchen",
        description: "Pre-seasoned cast iron skillet for versatile cooking",
        price: 34.99,
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.6,
        isAvailable: true,
        stock: 45
    },
    {
        name: "Food Processor",
        category: "kitchen",
        description: "Multi-function food processor with multiple attachments",
        price: 159.99,
        imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "kitchen",
        ratings: 4.5,
        isAvailable: true,
        stock: 30
    },

    // Books
    {
        name: "JavaScript Programming Guide",
        category: "books",
        description: "Comprehensive guide to modern JavaScript programming",
        price: 39.99,
        imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "books",
        ratings: 4.7,
        isAvailable: true,
        stock: 50
    },
    {
        name: "Mystery Novel",
        category: "books",
        description: "Bestselling mystery novel with captivating storyline",
        price: 16.99,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "books",
        ratings: 4.4,
        isAvailable: true,
        stock: 75
    },
    {
        name: "Cookbook Collection",
        category: "books",
        description: "Collection of international recipes for home cooking",
        price: 29.99,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "books",
        ratings: 4.6,
        isAvailable: true,
        stock: 40
    },
    {
        name: "Self-Help Guide",
        category: "books",
        description: "Motivational guide for personal development",
        price: 22.99,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "books",
        ratings: 4.5,
        isAvailable: true,
        stock: 60
    },
    {
        name: "Science Fiction Novel",
        category: "books",
        description: "Epic science fiction adventure in space",
        price: 18.99,
        imageUrl: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "books",
        ratings: 4.8,
        isAvailable: true,
        stock: 55
    },
    {
        name: "Photography Handbook",
        category: "books",
        description: "Complete guide to digital photography techniques",
        price: 34.99,
        imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "books",
        ratings: 4.7,
        isAvailable: true,
        stock: 35
    },

    // Sports
    {
        name: "Yoga Mat",
        category: "sports",
        description: "Non-slip yoga mat for comfortable workouts",
        price: 29.99,
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "sports",
        ratings: 4.5,
        isAvailable: true,
        stock: 45
    },
    {
        name: "Adjustable Dumbbells",
        category: "sports",
        description: "Space-saving adjustable dumbbells for strength training",
        price: 159.99,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "sports",
        ratings: 4.3,
        isAvailable: true,
        stock: 20
    },
    {
        name: "Resistance Bands Set",
        category: "sports",
        description: "Complete resistance bands set with different resistance levels",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "sports",
        ratings: 4.4,
        isAvailable: true,
        stock: 70
    },
    {
        name: "Basketball",
        category: "sports",
        description: "Official size basketball for indoor and outdoor play",
        price: 34.99,
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "sports",
        ratings: 4.6,
        isAvailable: true,
        stock: 85
    },
    {
        name: "Tennis Racket",
        category: "sports",
        description: "Professional tennis racket with comfortable grip",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "sports",
        ratings: 4.5,
        isAvailable: true,
        stock: 40
    },
    {
        name: "Running Shoes",
        category: "sports",
        description: "Lightweight running shoes with superior cushioning",
        price: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Black", "White", "Blue", "Gray"],
        type: "sports",
        ratings: 4.7,
        isAvailable: true,
        stock: 60
    },
    {
        name: "Gym Bag",
        category: "sports",
        description: "Spacious gym bag with separate shoe compartment",
        price: 39.99,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "sports",
        ratings: 4.3,
        isAvailable: true,
        stock: 55
    },
    {
        name: "Water Bottle",
        category: "sports",
        description: "Insulated stainless steel water bottle",
        price: 19.99,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "sports",
        ratings: 4.4,
        isAvailable: true,
        stock: 100
    },

    // Beauty
    {
        name: "Anti-Aging Face Cream",
        category: "beauty",
        description: "Premium anti-aging moisturizer for all skin types",
        price: 34.99,
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.6,
        isAvailable: true,
        stock: 60
    },
    {
        name: "Lipstick Collection",
        category: "beauty",
        description: "Set of 6 vibrant lipstick shades in matte finish",
        price: 49.99,
        imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.4,
        isAvailable: true,
        stock: 40
    },
    {
        name: "Makeup Brush Set",
        category: "beauty",
        description: "Professional makeup brush set with carrying case",
        price: 29.99,
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.7,
        isAvailable: true,
        stock: 50
    },
    {
        name: "Hair Straightener",
        category: "beauty",
        description: "Ceramic hair straightener with adjustable temperature",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.5,
        isAvailable: true,
        stock: 35
    },
    {
        name: "Perfume Set",
        category: "beauty",
        description: "Collection of 3 luxury fragrances for women",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.8,
        isAvailable: true,
        stock: 25
    },
    {
        name: "Skincare Kit",
        category: "beauty",
        description: "Complete skincare routine with cleanser, toner, and serum",
        price: 69.99,
        imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.6,
        isAvailable: true,
        stock: 45
    },
    {
        name: "Nail Polish Set",
        category: "beauty",
        description: "Set of 12 trendy nail polish colors",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.3,
        isAvailable: true,
        stock: 65
    },
    {
        name: "Hair Dryer",
        category: "beauty",
        description: "Professional ionic hair dryer with multiple heat settings",
        price: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop",
        sizes: null,
        colors: null,
        type: "beauty",
        ratings: 4.4,
        isAvailable: true,
        stock: 30
    }
];

// Function to upload products to Firebase
export const uploadProductsToFirebase = async () => {
    try {
        console.log('Starting product upload...');
        const result = await batchAddProducts(sampleProducts);

        if (result.success) {
            console.log('Products uploaded successfully!');
            return { success: true, message: 'All products uploaded successfully!' };
        } else {
            console.error('Error uploading products:', result.error);
            return { success: false, message: result.error };
        }
    } catch (error) {
        console.error('Error uploading products:', error);
        return { success: false, message: error.message };
    }
};

export default sampleProducts;
