import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Pages/MainLayout/MainLayout";
import App from "../App";
import DeliveryDetails from "../Pages/DeliveryDetails/DeliveryDetails";
import Transaction from "../Pages/Transaction/Transaction";
import Profile from "../Pages/Profile/Profile";
import TremsCondition from "../Pages/TremsCondition/TremsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import FAQ from "../Pages/FAQ/FAQ";
import ProfileUpdatePage from "../Pages/ProfileUpdatePage/ProfileUpdatePage";
import Login from "../Pages/Login/Login";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Otp from "../Pages/Otp/Otp";
import UpdatePassword from "../Pages/UpdatePassword/UpdatePassword";
import Notification from "../Pages/Notification/Notification";
import HostManagement from "../Pages/HostManagement/HostManagement";
import Category from "../Components/Category/Category";
import DjManagement from "../Pages/DjManagement/DjManagement";
import BarTender from "../Pages/BarTender/BarTender";
import BottleGirl from "../Pages/BottleGirl/BottleGirl";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element:<ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/guest',
                element: <DeliveryDetails />
            },
            {
                path: '/host',
                element: <HostManagement/>
            },
            {
                path: '/earning',
                element: <Transaction />
            },
            {
                path: '/dj',
                element: <DjManagement/>
            },

            {
                path: '/bartender',
                element: <BarTender/>
            },
            {
                path: '/bottle-girls',
                element: <BottleGirl/>
            },
           
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/category',
                element: <Category/>
            },
            {
                path: '/terms-condition',
                element: <TremsCondition />
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path: '/profile-update-request',
                element: <ProfileUpdatePage />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path : "/notification",
                element : <Notification/>
            }


        ],


    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/auth/forget-password',
        element: <ForgetPassword />
    },
    {
        path: '/auth/otp',
        element: <Otp />
    },
    {
        path: '/auth/update-password',
        element: <UpdatePassword />
    },
    {
        path: '/auth/update-password',
        element: <UpdatePassword />
    }
])