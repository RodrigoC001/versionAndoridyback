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
import * as originActions from "../../redux/actions/origins";
import * as destinationActions from "../../redux/actions/destinations";

// Alert components
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "Components/Snackbar/Snackbar.jsx"

// Spinner
import CircularProgress from '@material-ui/core/CircularProgress';


const mapStateToProps = state => ({
  createdOrigin: state.origins.createdOrigin,
  createdDestination: state.origins.createdDestination,
  origin: state.origins.origin
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      originActions,
      destinationActions,
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
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

class AgregarOrigenDestino extends React.Component {
  state = {
    address: '',
    openSuccess: false,
    openFailure: false,
    fetching: true
  }
  componentDidMount() {
    const { id } = this.props.match.params

    this.props.getOriginRequest(id)
      .then(origin => {
        const { address } = this.props.origin.data

        this.setState({
          address,
          fetching: false
        })
      })
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
    const { id } = this.props.match.params
    
    event.preventDefault();

    if(this.state.address === '') return this.showNotificationFailure()

    const modifyOriginAndDestination = [
      this.props.putOrigin(id, {address: this.state.address}),
      this.props.putDestination(id, {address: this.state.address})
    ]

    Promise.all(modifyOriginAndDestination)
      .then(data => {
        this.showNotificationSuccess()
      })
      .catch(error => {
        console.log('error', error)
        this.showNotificationFailure()
      })
  }
  showNotificationSuccess = () => {
    this.setState({
      openSuccess: true, 
      address: '',
    });
    setTimeout(function(){
            this.setState({openSuccess: false}, ()=> this.props.history.push('/tablaorigendestino'));
        }.bind(this),1000);
  }
  showNotificationFailure = () => {
    this.setState({
      openFailure: true, 
      // address: '',
    });
    setTimeout(function(){
            this.setState({openFailure: false});
        }.bind(this),6000);
  }
  render() {
  const { classes } = this.props;
  if(this.state.fetching || !this.props.origin) return (<div className={classes.spinnerContainer}><CircularProgress className={classes.progress}/></div>)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{this.props.origin && this.props.origin.data.address}</h4>
                  <p className={classes.cardCategoryWhite}>Modificar Origen & Destino</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Ciudad"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: El Calafate, Argentina',
                          value: this.state.address,
                          name: 'address'
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">Modificar</Button>
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
            message="Origen & Destino modificado!"
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
            message="Error, verifica que todos los campos esten completos"
            open={this.state.openFailure}
            closeNotification={() => this.setState({openFailure:false})}
            close
          />
        </div>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(AgregarOrigenDestino);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);