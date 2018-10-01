// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import AddLocation from "@material-ui/icons/AddLocation";
import Description from "@material-ui/icons/Description";
import MyLocation from "@material-ui/icons/MyLocation";
import InsertComment from "@material-ui/icons/InsertComment";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";


// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import AgregarRuta from "../views/AgregarRuta/AgregarRuta.jsx";
import AgregarSkyspot from "../views/AgregarSkyspot/AgregarSkyspot.jsx";
import AgregarOrigenDestino from "../views/AgregarOrigenDestino/AgregarOrigenDestino.jsx";

import RoutesTable from "../views/RoutesTable/RoutesTable.jsx";
import SkyspotsTable from "../views/SkyspotsTable/SkyspotsTable.jsx";
import OrigenDestinoTable from "../views/OrigenDestinoTable/OrigenDestinoTable.jsx";
import PrivacyAndTerms from "../views/PrivacyAndTerms/PrivacyAndTerms.jsx";
import Faq from "../views/Faq/Faq.jsx";



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
  {
    path: "/crearorigendestino",
    sidebarName: "Agregar Origen & Destino",
    navbarName: "Agregar Origen & Destino",
    icon: MyLocation,
    component: AgregarOrigenDestino
  },
  {
    path: "/tablaorigendestino",
    sidebarName: "Ver Origenes & Destinos",
    navbarName: "Ver Origenes & Destinos",
    icon: Description,
    component: OrigenDestinoTable
  },
  {
    path: "/privacyterms",
    sidebarName: "Privacidad & Terminos",
    navbarName: "Privacidad & Terminos",
    icon: InsertComment,
    component: PrivacyAndTerms
  },
  {
    path: "/faq",
    sidebarName: "Preguntas Frecuentes",
    navbarName: "Preguntas Frecuentes",
    icon: QuestionAnswer,
    component: Faq
  },  
  { redirect: true, path: "/", to: "/crearruta", navbarName: "Redirect" }
];

export default dashboardRoutes;