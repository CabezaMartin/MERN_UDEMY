//LAYOUTS
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";
//admin PAGES
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SingIn/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
//pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
//others
import Error404 from "../pages/Error404";

const routes = [{
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [{
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSingIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [{
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    }

]

export default routes;