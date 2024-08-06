import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import City from "./Pages/City"
import Dashboard from "./Pages/Dashboard"
import Settings from "./Pages/Settings"
import Brands from "./Pages/Brands"
import Cars from "./Pages/Cars"
import Login from "../Login/Login"
import Location from "./Pages/Location"
import Models from "./Pages/Models"
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [{
            path:'/',
            element: <Dashboard/>
        },
    {
        path:'/setting',
        element: <Settings/>
    },{
        path:'/brand',
            element: <Brands/>
    },{
        path:'/cars',
            element: <Cars/>
    },{
        path:'/city',
            element:<City/>
    },{
        path:'/location',
            element:<Location/>
    },{
        path:'/models',
            element:<Models/>
    },]
    },
    {
        path: '/login',
        element:<Login/>
    }

])
export default router