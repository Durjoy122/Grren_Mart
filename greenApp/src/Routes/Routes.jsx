import { createBrowserRouter } from "react-router";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../Pages/Home";
import Plants from "../Pages/Plants";
import MyProfile from "../Pages/MyProfile";
import PrivateRoute from "../Provider/PrivateRoute";
import PlantDetails from "../layouts/Components/PlantDetails";
import Loading from "../Pages/Loading";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                loader: async () => {
                    const [plantsRes, expertsRes] = await Promise.all([
                        fetch("/plants.json"),
                        fetch("/experts.json")
                    ]);
                    const plants = await plantsRes.json();
                    const experts = await expertsRes.json();
                    return { plants, experts };
                },
                element: <Home />,
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path: "plants",
                loader: () => fetch("/plants.json"),
                element: <PrivateRoute>
                    <Plants />
                </PrivateRoute>,
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path: "profile",
                element:<PrivateRoute>
                   <MyProfile></MyProfile>
                </PrivateRoute>,
            },
            {
                path: "plants/:id",
                loader: () => fetch("/plants.json"),
                element: (
                    <PrivateRoute>
                       <PlantDetails />
                    </PrivateRoute>
                ),
                hydrateFallbackElement:<Loading></Loading>
            }
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "registration",
                element: <Registration />,
            },
        ],
    },
]);

export default router;