//LAYOUTS
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";
//admin PAGES
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SingIn/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminTeamsWeb from "../pages/Admin/TeamWeb";
import PlayersTeam from "../pages/Admin/PlayersTeam";
import LeaderTeamWeb from "../pages/Admin/LeaderTeamWeb";
import GamesWeb from "../pages/Admin/GamesWeb";
import PlayerInfo from "../pages/Admin/PlayerInfo";
import StatePlayers from "../pages/Admin/StatePlayers";
import {} from "../pages/Admin/TeamWeb"
//pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
//others
import Error404 from "../pages/Error404";

const routes = [{
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        breadcrumbName: 'admin',
        routes: [{
                path: "/admin",
                component: AdminHome,
                breadcrumbName: 'admin',
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
                path: "/admin/teams",
                component: AdminTeamsWeb,
                breadcrumbName: 'teams',
                exact: true,
            },    
            {
                path: "/admin/players",
                component: PlayersTeam,
                breadcrumbName: 'players',
                exact: true
            },      
            {
                path:"/admin/leaders",
                component: LeaderTeamWeb,
                breadcrumbName: 'leaders',
                exact: true
            },      
            {
                path:"/admin/games",
                component: GamesWeb,
                breadcrumbName: 'games',
                exact: true
            },        
            {
                path:"/admin/statePlayers",
                component: StatePlayers,
                exact: true,
                breadcrumbName: 'statePlayers'
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
                path: "/players",
                component: PlayersTeam,
                breadcrumbName: 'players',
                exact: true
            },
            {
                path:"/leaders",
                component: LeaderTeamWeb,
                breadcrumbName: 'leaders',
                exact: true
            },           
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path:"/games",
                component: GamesWeb,
                breadcrumbName: 'games',
                exact: true
            },        
            {
                path:"/statePlayers",
                component: StatePlayers,
                exact: true,
                breadcrumbName: 'statePlayers'
            },              
            {
                path:"/showPlayer",
                component: PlayerInfo,
                exact: true,
                breadcrumbName: 'showPlayer'
            },            
            {
                component: Error404,
            }
        ]
    }

]

export default routes;