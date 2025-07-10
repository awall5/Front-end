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

  const addProduct = async (e) => {
    try {
      e.preventDefault();
      const title = e.target.title.value;
      const price = e.target.price.value;
      const description = e.target.description.value;
      const quantity = e.target.quantity.value;

      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          price: price,
          description,
          quantity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status == 201) {
        alert("Product added successfully");
        getData(); // Refresh the product list after adding a new product
        e.target.reset(); // Reset the form fields
        console.log("response----->", resp);
      } else {
        const result = await resp.json();
        alert("Invalid Data: " + result.message);
      }
    } catch (error) {
      console.error("Error adding product:---->", error.message);
      alert("Error adding product: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [editProductId, setEditProductId] = useState("");

  const [updatedPrice, setUpdatedPrice] = useState(-1);

  const handleEditProduct = async (productId) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            price: updatedPrice,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.status === 200) {
        alert("Product updated successfully");
        getData(); // Refresh the product list after updating
        setEditProductId(""); // Clear the edit mode
      } else {
        const result = await resp.json();
        alert("Error While updating the price " + result.message);
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Error updating product: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300">
      <Navbar />

      <div className="flex flex-col items-center mt-10">
        <form
          onSubmit={addProduct}
          className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-blue-300 backdrop-blur-md"
        >
          <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
            Add New Product
          </h2>
          <div className="mb-5">
            <label className="block text-blue-700 font-semibold mb-2">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="w-full py-3 px-4 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              placeholder="Product title"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-blue-700 font-semibold mb-2">
              Price
            </label>
            <input
              name="price"
              type="number"
              className="w-full py-3 px-4 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              placeholder="Product price"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-blue-700 font-semibold mb-2">
              Description
            </label>
            <input
              name="description"
              type="text"
              className="w-full py-3 px-4 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              placeholder="Product description"
            />
          </div>
          <div className="mb-8">
            <label className="block text-blue-700 font-semibold mb-2">
              Quantity
            </label>
            <input
              name="quantity"
              type="number"
              className="w-full py-3 px-4 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              placeholder="Product quantity"
            />
          </div>
          <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-800 shadow-md transition-all duration-200">
            Add Product
          </button>
        </form>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-10 p-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative p-8 border border-blue-200 rounded-2xl shadow-xl w-80 bg-white hover:scale-105 hover:shadow-2xl transition-transform duration-200 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-3 truncate">
              {product.title}
            </h2>

            {product._id === editProductId ? (
              <div className="flex flex-col gap-2 mb-3">
                <input
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  type="number"
                  className="py-2 px-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Update price"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditProductId("")}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-green-600 font-semibold text-xl mb-2">
                ${product.price}
              </p>
            )}

            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-semibold mb-4 self-start">
              Quantity: {product.quantity}
            </span>

            {product._id !== editProductId && (
              <button
                onClick={() => {
                  setEditProductId(product._id);
                  setUpdatedPrice(product.price);
                }}
                className="absolute top-4 right-4 py-1 px-4 bg-blue-100 text-blue-700 rounded-full text-xs font-bold hover:bg-blue-200 transition"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProfilePage };
