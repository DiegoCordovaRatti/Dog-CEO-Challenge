import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home"
import List from "../pages/list/List"
import Search from "../pages/search/Search"

export const routes = createBrowserRouter ([
    {
        element: <Layout />,
        children:[
            { 
                path: '/', 
                element: <Home /> 
            },
            { 
                path: '/search', 
                element: <Search /> 
            },
            { 
                path: '/list', 
                element: <List />
            }
        ]
    }
])