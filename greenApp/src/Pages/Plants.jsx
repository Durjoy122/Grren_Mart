import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Plants = () => {
    const plants = useLoaderData();


  return (
    <div className="px-5 py-10 bg-green-50 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
            🌿 All Indoor Plants
        </h2>

        {/* Plant Cards */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {plants.map((plant) => (
                <motion.div
                    key={plant.plantId}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                >
                    <img
                        src={plant.image}
                        alt={plant.plantName}
                        className="w-full h-60 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold text-green-800">
                    {plant.plantName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{plant.category}</p>

                    <div className="flex justify-between items-center mb-3">
                        <span className="text-green-700 font-bold">${plant.price}</span>
                        <span className="flex items-center text-yellow-500">
                            <Star size={16} className="fill-yellow-400" /> {plant.rating}
                        </span>
                    </div>

                    <Link to={`/plants/${plant.plantId}`}>
                        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                            View Details
                        </button>
                    </Link>
                </motion.div>
            ))}
        </div>
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Plants;