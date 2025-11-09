import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useLoaderData , Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loading from './Loading';

const Home = () => {
  const { plants, experts } = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const topPlant = plants.reduce((best, plant) => 
      plant.rating > best.rating ? plant : best, plants[0]
  );
  if (loading) return <Loading></Loading>;
  return (
    <div>
        <section className="mb-12">
            <Swiper autoplay={{ delay: 3000 }} loop>
                <SwiperSlide>
                    <div className="h-[400px] bg-green-100 flex items-center justify-center text-3xl font-bold text-green-800">
                        Bring Nature Into Your Home 🌱
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[400px] bg-green-200 flex items-center justify-center text-3xl font-bold text-green-900">
                        Fresh Air, Fresh Mind 🍃
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>

        <section className="mb-12 px-5">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
                Top Rated Indoor Plants
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {plants.slice(0, 4).map((plant) => (
                    <motion.div
                            key={plant.plantId}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
                    >
                        <img
                            src={plant.image}
                            alt={plant.plantName}
                            className="w-full h-48 object-cover rounded-xl"
                        />
                            <h3 className="text-lg font-semibold mt-3">{plant.plantName}</h3>
                            <p className="text-sm text-gray-500">{plant.category}</p>
                            <div className="flex items-center justify-between mt-2">
                            <span className="text-green-600 font-bold">${plant.price}</span>
                            <span className="flex items-center text-yellow-500">
                            <Star size={16} className="fill-yellow-400" /> {plant.rating}
                        </span>
                        </div>
                       <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                            <Link to={`/plants/${plant.plantId}`} className="block w-full h-full">
                                View Details
                            </Link>
                       </button>
                    </motion.div>
                ))}
            </div>
         </section>

         <section className="mb-12 px-5">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
                🌟 Top Plant of the Week
                </h2>
                <motion.div
                whileHover={{ scale: 1.05 }}
                className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
                >
                <img
                    src={topPlant.image}
                    alt={topPlant.plantName}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold text-green-800">{topPlant.plantName}</h3>
                <p className="text-gray-500 mb-2">{topPlant.category}</p>
                <div className="flex items-center justify-center mb-3">
                    <Star size={18} className="fill-yellow-400 mr-1" /> 
                    <span className="text-yellow-600 font-semibold">{topPlant.rating}</span>
                </div>
                <p className="text-green-600 font-bold mb-4">${topPlant.price}</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                    <Link to={`/plants/${topPlant.plantId}`} className="block w-full h-full">
                    View Details
                    </Link>
                </button>
                </motion.div>
        </section>

         <section className="bg-green-50 py-10 px-5 mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
                 Plant Care Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="font-semibold text-green-700 mb-2">💧 Watering</h3>
                    <p>Water once a week or when the topsoil feels dry.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="font-semibold text-green-700 mb-2">☀️ Sunlight</h3>
                    <p>Place in indirect sunlight for healthy growth.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="font-semibold text-green-700 mb-2">🌿 Fertilizing</h3>
                    <p>Use organic fertilizer once every two months.</p>
                </div>
            </div>
         </section>

         <section className="mb-12 px-5">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
                    Meet Our Plant Experts
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {experts.map((expert) => (
                        <motion.div
                            key={expert.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
                        >
                            <img
                                src={expert.img}
                                alt={expert.name}
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                            />
                                <h3 className="text-lg font-semibold text-green-800">{expert.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{expert.specialty}</p>
                                <div className="flex items-center justify-center mb-3">
                                    <Star size={16} className="fill-yellow-400 mr-1" /> {expert.rating}
                                 </div>
                                <p className="text-green-500">{expert.role}</p>
                        </motion.div>
                    ))}
                </div>
          </section>
    </div>
  );
};

export default Home;