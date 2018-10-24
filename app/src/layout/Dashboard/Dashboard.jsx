/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core Components
import withStyles from "@material-ui/core/styles/withStyles";
// core Components
import Header from "Components/Header/Header.jsx";
// import Footer from "Components/Footer/Footer.jsx";
import Sidebar from "Components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "../../routes/dashboard.jsx";

import dashboardStyle from "Assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "Assets/img/aire_1242x2436.png";
import logo from "Assets/img/aire@2x.png";

import ModificarRuta from "../../views/ModificarRuta/ModificarRuta.jsx";
import ModificarSkyspot from "../../views/ModificarSkyspot/ModificarSkyspot.jsx";
import ModificarOrigenDestino from "../../views/ModificarOrigenDestino/ModificarOrigenDestino.jsx";
import Login from "./Login.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../redux/actions/auth";


const mapStateToProps = state => ({
  fetching: state.auth.fetching,
  user: state.auth.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      authActions
    ),
    dispatch
  );
}

const switchRoutes = (
  <Switch>
    <Route  path="/trips/:id" component={ModificarRuta} />
    <Route  path="/skyspots/:id" component={ModificarSkyspot} />
    <Route  path="/origendestino/:id" component={ModificarOrigenDestino} />
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

const styleCss = {
    // backgroundColor: 'rgb(93,191,189)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100vh"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  handleLoginFailure = () => {
    this.props.history.push('/login')
  }
  componentDidMount() {
    this.props.getMeRequest()
      .then(data => {
        console.log('this.props.user', this.props.user)
        if(!this.props.user) {
          this.handleLoginFailure()
        }
      })

    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      if(this.refs.mainPanel) {
        this.refs.mainPanel.scrollTop = 0;
      }
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    // if(true) return <Login />
    // if(this.props.fetching) return <div style={styleCss}><CircularProgress size={50} /></div>
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"AI.RE"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
        {
          this.props.fetching ? <div style={styleCss}><CircularProgress size={50} /></div> 
          : (
            <div>
            <Header
              routes={dashboardRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            </div>
            )
        }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const styledComponent = withStyles(dashboardStyle)(App);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);