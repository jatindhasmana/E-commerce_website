import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:3000/add-product", {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        navigate("/");
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Add Product</h3>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter product name"
                />
                {error && !name && <span className="text-red-500 text-sm">Enter a valid name</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="text"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter product price"
                />
                {error && !price && <span className="text-red-500 text-sm">Enter a valid price</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter product category"
                />
                {error && !category && <span className="text-red-500 text-sm">Enter a valid category</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter product company"
                />
                {error && !company && <span className="text-red-500 text-sm">Enter a valid company</span>}
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Add
            </button>
        </div>
    );
};

export default AddProduct;
