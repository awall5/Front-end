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
    <div>
      <Navbar />

      <div>
        <form onSubmit={addProduct} className=" mx-auto my-4 flex flex-col items-center gap-5 p-4 bg-sky-600  max-w-150 border-2">
          <div className="flex gap-4 " >
            <label>Title</label>
            <input  name="title" type="text" className="b-1 py-1 px-2 rounded-md border-2" />
          </div>
          <div className="flex gap-4">
            <label>Price</label>
            <input name="price" type="number" className="b-1 py-1 px-2 rounded-md border-2" />
          </div>
          <div className="flex gap-4">
            <label>Discription</label>
            <input name="description" type="text" className="b-1 py-1 px-2 rounded-md border-2" />
          </div>
          <div className="flex gap-4">
            <label>Quantity</label>
            <input name="quantity" type="number" className="b-1 py-1 px-2 rounded-md border-2" />
          </div>
          <button className="b-1 py-1 px-2 rounded-md border-2">Add Product</button>
        </form>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="p-4 border-2 rounded-lg shadow-lg w-64 bg-sky-200 hover:bg-amber-50"
            >
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <p className="text-gray-600">{product.description}</p> 
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ProfilePage };
