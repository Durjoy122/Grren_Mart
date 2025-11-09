
import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "./Loading";

const MyProfile = () => {
    const { user, loading, updateUser } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [updating, setUpdating] = useState(false);

    if(loading) return <Loading></Loading>;

    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdating(true);
        updateUser({ displayName, photoURL })
            .then(() => {
                toast.success("Profile updated successfully!");
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => setUpdating(false));
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-green-800">My Profile</h2>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={user?.photoURL || "https://i.ibb.co/0Jmshvb/avatar.png"}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <p className="text-lg font-semibold">{user?.displayName || "No Name"}</p>
                <p className="text-gray-500">{user?.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Photo URL
                    </label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter photo URL"
                    />
                </div>

                <button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                    {updating ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default MyProfile;