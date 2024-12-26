import { useEffect, useState } from "react"
import ProductService from "../services/product"
import { useCart } from "../utils/cartContext"
import toast from "react-hot-toast"

const Shop = () => {
  const [products, setProducts] = useState<any[]>([])
  const { setCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts()
        setProducts(response)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  const handleOrder = (product: any) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id)
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    toast.success(`Order placed for product: ${product.name}`)
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
                onClick={() => handleOrder(product)}
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
