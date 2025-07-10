import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";

const ProfilePage = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "GET",
      });
      const result = await resp.json();
      console.log("Result-------->", result);
      setProducts(result.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


const addProduct = async(e) => {
  try {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const quantity = e.target.quantity.value;
    
    const resp  = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
      method: "POST",
      body: JSON.stringify({
        title:title , 
        price: price, 
        description,
        quantity
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(resp.status == 201) {

      alert("Product added successfully");
      getData(); // Refresh the product list after adding a new product
      e.target.reset(); // Reset the form fields
      console.log("response----->", resp);
    
    }
    else{
      const result = await resp.json();
      alert("Invalid Data: " + result.message);
    }


  } catch (error) {
    console.error("Error adding product:---->", error.message);
    alert("Error adding product: " + error.message);
  };

}

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <Navbar />

      <div className="flex flex-col items-center mt-8">
        <form
          onSubmit={addProduct}
          className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border border-blue-200"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Add New Product</h2>
          <div className="mb-4">
            <label className="block text-blue-700 font-semibold mb-1">Title</label>
            <input
              name="title"
              type="text"
              className="w-full py-2 px-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-semibold mb-1">Price</label>
            <input
              name="price"
              type="number"
              className="w-full py-2 px-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-semibold mb-1">Description</label>
            <input
              name="description"
              type="text"
              className="w-full py-2 px-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product description"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-700 font-semibold mb-1">Quantity</label>
            <input
              name="quantity"
              type="number"
              className="w-full py-2 px-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product quantity"
              required
            />
          </div>
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8 p-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-6 border border-blue-200 rounded-xl shadow-lg w-72 bg-white hover:scale-105 hover:shadow-2xl transition transform duration-200"
          >
            <h2 className="text-xl font-bold text-blue-800 mb-2">{product.title}</h2>
            <p className="text-green-600 font-semibold text-lg mb-1">${product.price}</p>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              Quantity: {product.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProfilePage };
