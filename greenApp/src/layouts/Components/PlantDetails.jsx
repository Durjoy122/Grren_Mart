
import { useLoaderData, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlantDetails = () => {
    const plants = useLoaderData();
    const { id } = useParams();
    const [formData, setFormData] = useState({ name: "", email: "" });
    const plant = plants.find((p) => p.plantId === parseInt(id));

    if(!plant) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold text-red-600">Plant not found 🌿</p>
            </div>
        );
    }

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name || !formData.email) {
            toast.error("Please fill in all fields!");
            return;
        }
        toast.success("Consultation booked successfully! 🌿");
        setFormData({ name: "", email: "" }); 
    };

  return (
    <div>
         <motion.div
        className="max-w-4xl mx-auto my-10 bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
        <img
            src={plant.image}
            alt={plant.plantName}
            className="w-full md:w-1/2 rounded-xl object-cover shadow-md"
        />

        {/* Info Section */}
        <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-green-800">{plant.plantName}</h2>
            <p className="text-gray-600">{plant.description}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {plant.category}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Care: {plant.careLevel}
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400" /> {plant.rating}
                </span>
            </div>

            <div className="flex flex-col justify-between items-center mt-4 bg-green-50 rounded-xl p-3 w-full">
                <span className="text-2xl font-bold text-green-700">
                    ${plant.price}
                </span>
                {plant.availableStock > 0 ?
                (
                    <span className="text-sm text-green-600 font-medium">
                        In Stock: {plant.availableStock}
                    </span>
                ) 
                : 
                (
                    <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                )}
            </div>

            <div className="mt-6 flex gap-3">
                <Link
                    to="/plants"
                    className="border border-green-600 text-green-700 px-6 py-2 rounded-lg hover:bg-green-100 transition"
                >
                    Back to Plants
                </Link>
            </div>
        </div>
       </motion.div>
       <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-center text-green-800 mb-4">
                    Book Consultation 🌸
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                        Name
                        </label>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                        Email
                        </label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            Book Now
                    </button>
                </form>
            </div>
       </div>
     );
};

export default PlantDetails;