import React, { useEffect, useState } from "react";
import firebase from "./utils/firebase";
import { Switch, Route, Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ReceiptIcon from "@material-ui/icons/Receipt";
import StoreIcon from "@material-ui/icons/Store";
import TableChartIcon from "@material-ui/icons/TableChart";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import GpsNotFixedIcon from "@material-ui/icons/GpsNotFixed";
import MessageIcon from "@material-ui/icons/Message";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import Loader from "./components/Loader";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Accounting from "./pages/Accounting";
import Warehouse from "./pages/Warehouse";
import Travels from "./pages/Travels";
import Vehicles from "./pages/Vehicles";
import Quotes from "./pages/Quotes";
import Messages from "./pages/Messages";
import Configuration from "./pages/Configuration";
import SingleWarehouse from "./pages/SingleWarehouse";
import Payroll from "./pages/Payroll";
import Catalogs from "./pages/Catalogs";
import SinglePayroll from "./pages/SinglePayroll";
import SingleVehicle from "./pages/SingleVehicle";
import SingleTravel from "./pages/SingleTravel";
import Remissions from "./pages/Remissions";
import SingleRemission from "./pages/SingleRemission";
import ExcelReader from "./pages/ExcelReader";
import Uploader from "./pages/Uploader";
import Vendors from "./pages/Vendors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

export default function App(props) {
  const loc = props.location.pathname.split("/")[1];
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.isInitialized().then((user) => {
      if (user) {
        firebase.userSession().then((data) => {
          if (data.rol === "admin" || data.rol === "agent") {
            setUser(data);
          } else {
            firebase.logout().then(() => {
              alert("No tienes los permisos necesarios para continuar");
              props.history.push("/iniciar-sesion");
            });
          }
        });
      } else {
        props.history.push("/iniciar-sesion");
      }
    });
  }, [props.history]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          selected={loc === "" || loc === undefined ? true : false}
          component={Link}
          to="/"
          button
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          selected={loc === "ventas" ? true : false}
          component={Link}
          to="/ventas"
          button
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Ventas" />
        </ListItem>
        <ListItem
          selected={loc === "remisiones" ? true : false}
          component={Link}
          to="/remisiones"
          button
        >
          <ListItemIcon>
            <PointOfSaleIcon />
          </ListItemIcon>
          <ListItemText primary="Remisiones" />
        </ListItem>
        <ListItem
          selected={loc === "compras" ? true : false}
          component={Link}
          to="/compras"
          button
        >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Compras" />
        </ListItem>
        <ListItem
          selected={loc === "contabilidad" ? true : false}
          component={Link}
          to="/contabilidad"
          button
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Contabilidad" />
        </ListItem>
        <ListItem
          selected={loc === "almacen" ? true : false}
          component={Link}
          to="/almacen"
          button
        >
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Almacenes y Oficinas" />
        </ListItem>
        <ListItem
          selected={loc === "viajes" ? true : false}
          component={Link}
          to="/viajes"
          button
        >
          <ListItemIcon>
            <FlightTakeoffIcon />
          </ListItemIcon>
          <ListItemText primary="Viajes" />
        </ListItem>
        <ListItem
          selected={loc === "vehiculos" ? true : false}
          component={Link}
          to="/vehiculos"
          button
        >
          <ListItemIcon>
            <DriveEtaIcon />
          </ListItemIcon>
          <ListItemText primary="Vehículos" />
        </ListItem>
        <ListItem
          selected={loc === "nomina" ? true : false}
          component={Link}
          to="/nomina"
          button
        >
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Nómina" />
        </ListItem>
        <ListItem
          selected={loc === "cotizaciones" ? true : false}
          component={Link}
          to="/cotizaciones"
          button
        >
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Cotizaciones" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          selected={loc === "mensajes" ? true : false}
          component={Link}
          to="/mensajes"
          button
        >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Mensajes" />
        </ListItem>
        <ListItem
          selected={loc === "vendedores" ? true : false}
          component={Link}
          to="/vendedores"
          button
        >
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Vendedores" />
        </ListItem>
        <ListItem
          selected={loc === "configuracion" ? true : false}
          component={Link}
          to="/configuracion"
          button
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
        <ListItem
          selected={loc === "seguimiento" ? true : false}
          component={Link}
          to="/seguimiento"
          button
        >
          <ListItemIcon>
            <GpsNotFixedIcon />
          </ListItemIcon>
          <ListItemText primary="Seguimiento" />
        </ListItem>
      </List>
    </div>
  );

  return user ? (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ color: "#fff", fontWeight: "700" }}
            variant="h6"
            noWrap
          >
            Panel de Administrador
          </Typography>
          <IconButton onClick={logOut} style={{ marginLeft: "auto" }}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            path="/excel-reader"
            render={(props) => <ExcelReader {...props} />}
          />
          <Route path="/ventas" render={(props) => <Sales {...props} />} />
          <Route path="/compras" render={(props) => <Purchases {...props} />} />
          <Route
            path="/contabilidad"
            render={(props) => <Accounting {...props} />}
          />
          <Route
            path="/remisiones"
            render={(props) => <Remissions {...props} />}
            exact={true}
          />
          <Route
            path="/remisiones/detalle/:id"
            render={(props) => <SingleRemission {...props} />}
            exact={true}
          />
          <Route
            path="/almacen"
            render={(props) => <Warehouse {...props} />}
            exact={true}
          />
          <Route
            path="/almacen/:id"
            render={(props) => <SingleWarehouse {...props} />}
          />

          <Route
            path="/viajes"
            render={(props) => <Travels {...props} />}
            exact={true}
          />
          <Route
            path="/viajes/:id"
            render={(props) => <SingleTravel {...props} />}
            exact={true}
          />

          <Route
            path="/nomina"
            render={(props) => <Payroll {...props} />}
            exact={true}
          />
          <Route
            path="/nomina/:id"
            render={(props) => <SinglePayroll {...props} />}
            exact={true}
          />

          <Route
            path="/vehiculos"
            render={(props) => <Vehicles {...props} />}
            exact={true}
          />
          <Route
            path="/vehiculos/:id"
            render={(props) => <SingleVehicle {...props} />}
            exact={true}
          />

          <Route
            path="/cotizaciones"
            render={(props) => <Quotes {...props} />}
          />
          <Route
            path="/vendedores"
            render={(props) => <Vendors {...props} />}
          />
          <Route path="/mensajes" render={(props) => <Messages {...props} />} />
          <Route
            path="/configuracion"
            render={(props) => <Configuration {...props} />}
            exact={true}
          />
          <Route
            path="/configuracion/catalogos"
            render={(props) => <Catalogs {...props} />}
            exact={true}
          />
          <Route
            path="/uploader"
            render={(props) => <Uploader {...props} />}
            exact={true}
          />
        </Switch>
      </main>
    </>
  ) : (
    <Loader />
  );

  async function logOut() {
    try {
      firebase.logout().then(() => {
        props.history.push("/iniciar-sesion");
      });
    } catch (error) {
      alert(error.message);
    }
  }
}
