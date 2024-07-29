import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:3000/product/${params.id}`, {
            method: "GET",
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    };

    const handleUpdate = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        let result = await fetch(`http://localhost:3000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json",
            },
        });
        result = await result.json();
        navigate("/");
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Update Product</h3>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
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
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
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
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                </label>
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
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Update
            </button>
        </div>
    );
};

export default UpdateProduct;
