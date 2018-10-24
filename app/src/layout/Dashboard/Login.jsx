import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "Components/Grid/GridItem.jsx";
import GridContainer from "Components/Grid/GridContainer.jsx";
import CustomInput from "Components/CustomInput/CustomInput.jsx";
import Button from "Components/CustomButtons/Button.jsx";
import Card from "Components/Card/Card.jsx";
import CardHeader from "Components/Card/CardHeader.jsx";
import CardBody from "Components/Card/CardBody.jsx";
import CardFooter from "Components/Card/CardFooter.jsx";

// 
import Promise from 'bluebird';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../redux/actions/auth";

// Alert components
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "Components/Snackbar/Snackbar.jsx"
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => ({
  fetching: state.auth.fetching,
  user: state.auth.user
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

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  centerEverything: {
    // backgroundColor: 'rgb(93,191,189)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100vh"
  }
};

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    openSuccess: false,
    openFailure: false
  }
  componentDidMount() {
    // console.log('this.props del login', this.props)
    this.props.getMeRequest()
      .then(data => {
        if(this.props.user) {
          this.handleLoginSucces()
        }
      })
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.email === '') return this.showNotificationFailure();
    if(this.state.password === '') return this.showNotificationFailure();

    this.props.postLogin({
      email: this.state.email,
      password: this.state.password
    }, this.handleLoginSucces, this.showNotificationFailure)
      .then(data => {
        console.log('data', data)
        console.log('props after login', this.props)
      })

  }
  handleLoginSucces = () => {
    this.props.history.push('/crearruta')
  }
  showNotificationFailure = () => {
    this.setState({
      openFailure: true, 
      address: '',
    });
    setTimeout(function(){
            this.setState({openFailure: false});
        }.bind(this),6000);
  }
  render() {
  const { classes, fetching } = this.props;
  if(fetching) return <div className={classes.centerEverything}><CircularProgress size={50} /></div>
    return (
      <div className={classes.centerEverything}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card style={{ width: "20rem" }}>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>AI.RE Dashboard</h4>
                  <p className={classes.cardCategoryWhite}>Login</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="E-mail"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: email@email.com',
                          value: this.state.email,
                          name: 'email'
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Contraseña"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          // placeholder: 'Ej.: email@email.com',
                          value: this.state.password,
                          name: 'password',
                          type: 'password'
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">Enviar</Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
        <div>
          <Snackbar
            place="bc"
            color="success"
            icon={AddAlert}
            message="Origen & Destino creado!"
            open={this.state.openSuccess}
            closeNotification={() => this.setState({openSuccess:false})}
            close
          />
        </div>
        <div>
          <Snackbar
            place="bc"
            color="danger"
            icon={AddAlert}
            message="Error, verifica que todos los campos esten completos y las credenciales sean correctas"
            open={this.state.openFailure}
            closeNotification={() => this.setState({openFailure:false})}
            close
          />
        </div>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(Login);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);