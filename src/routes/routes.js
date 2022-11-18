import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home"
import BreedList from "../pages/list/List"

export const routes = createBrowserRouter ([
    {
        element: <Layout />,
        children:[
            { 
                path: '/', 
                element: <Home /> 
            },
            { 
                path: '/list', 
                element: <BreedList />
            }
        ]
    }
])