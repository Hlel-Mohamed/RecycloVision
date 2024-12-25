const products = [
  {
    id: 1,
    name: "Reusable Water Bottle",
    price: 20,
    coins: 50,
    description: "Eco-friendly reusable water bottle made of stainless steel.",
    image: "shop/bottle.jpg",
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag",
    price: 15,
    coins: 30,
    description: "Durable tote bag made from 100% organic cotton.",
    image: "shop/totebag.jpeg",
  },
  {
    id: 3,
    name: "Bamboo Toothbrush",
    price: 5,
    coins: 10,
    description: "Eco-friendly toothbrush made from bamboo.",
    image: "shop/bamboo.jpg",
  },
  {
    id: 4,
    name: "Solar-Powered Charger",
    description: "Charge your devices using renewable solar energy.",
    price: 40,
    coins: 100,
    image: "shop/solarbank.jpg",
  },
  {
    id: 5,
    name: "Recycled Notebook",
    description:
      "A notebook made from recycled paper, perfect for jotting ideas sustainably.",
    price: 10,
    coins: 20,
    image: "shop/notebook.jpg",
  },
]

const Shop = () => {
  const handleOrder = (productId: number) => {
    alert(`Order placed for product ID: ${productId}`)
  }

  return (
    <div className="px-10 py-5 h-full w-full">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Eco-Friendly Shop
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center h-[400px] justify-between"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            <h5 className="text-lg font-semibold text-center text-gray-800">
              {product.name}
            </h5>
            <p className="text-gray-600 text-center text-sm flex-grow">
              {product.description}
            </p>
            <div className="mt-auto text-center w-full">
              <p className="text-green-700 font-medium mt-2">
                Price: ${product.price}
              </p>
              <p className="text-green-700 font-medium">
                Coins: {product.coins}
              </p>
              <button
                onClick={() => handleOrder(product.id)}
                className="btn btn-success text-white mt-4 w-full"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
