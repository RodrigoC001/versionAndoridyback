// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import AddLocation from "@material-ui/icons/AddLocation";
import Description from "@material-ui/icons/Description";

// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import AgregarRuta from "../views/AgregarRuta/AgregarRuta.jsx";
import AgregarSkyspot from "../views/AgregarSkyspot/AgregarSkyspot.jsx";

import RoutesTable from "../views/RoutesTable/RoutesTable.jsx";
import SkyspotsTable from "../views/SkyspotsTable/SkyspotsTable.jsx";

const dashboardRoutes = [
/*  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },*/
  {
    path: "/crearruta",
    sidebarName: "Agregar Ruta",
    navbarName: "Agregar Ruta",
    icon: FlightTakeoff,
    component: AgregarRuta
  },
  {
    path: "/tablarutas",
    sidebarName: "Ver Rutas",
    navbarName: "Ver Rutas",
    icon: Description,
    component: RoutesTable
  },
  {
    path: "/crearskyspot",
    sidebarName: "Agregar Skyspot",
    navbarName: "Agregar Skyspot",
    icon: AddLocation,
    component: AgregarSkyspot
  },
  {
    path: "/tablaskyspots",
    sidebarName: "Ver Skyspots",
    navbarName: "Ver Skyspots",
    icon: Description,
    component: SkyspotsTable
  },
  { redirect: true, path: "/", to: "/ruta", navbarName: "Redirect" }
];

export default dashboardRoutes;
