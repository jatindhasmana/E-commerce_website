import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:3000/products");
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:3000/product/${id}`, {
            method: "DELETE"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:3000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h3 className="text-2xl font-bold mb-4">Product List</h3>
            <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg mb-4 w-full max-w-md"
                placeholder="Search Product"
                onChange={searchHandle}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border-b">S. No.</th>
                            <th className="p-3 border-b">Name</th>
                            <th className="p-3 border-b">Price</th>
                            <th className="p-3 border-b">Category</th>
                            <th className="p-3 border-b">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((item, index) => (
                                <tr key={item._id.toLowerCase()} className="even:bg-gray-50">
                                    <td className="p-3 border-b">{index + 1}</td>
                                    <td className="p-3 border-b">{item.name}</td>
                                    <td className="p-3 border-b">${item.price}</td>
                                    <td className="p-3 border-b">{item.category}</td>
                                    <td className="p-3 border-b flex gap-2">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                            onClick={() => deleteProduct(item._id)}
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            to={`/update/${item._id}`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-center"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-3 text-center text-lg font-bold">
                                    No Result Found !!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
