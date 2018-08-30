import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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
import * as tripActions from "../../redux/actions/trips";
import * as skyspotActions from "../../redux/actions/skyspots";


// Alert components
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "Components/Snackbar/Snackbar.jsx"


const mapStateToProps = state => ({
  createdOrigin: state.origins.createdOrigin,
  createdDestination: state.origins.createdDestination,
  createdTrip: state.trips.createdTrip,
  trips: state.trips.trips,
  skyspots: state.skyspots.skyspots
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      originActions,
      destinationActions,
      tripActions,
      skyspotActions
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
  formLabel: {
    fontSize: '14px'
  },
  formControl: {
    marginTop: 20,
    marginBottom: 20
  },

};

class AgregarRuta extends React.Component {
  state = {
    name: '',
    originAddress: '',
    destinationAddress: '',
    openSuccess: false,
    openFailure: false,
  }
  componentDidMount() {
    this.props.getSkyspotsRequest()
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  checkBox = name => event => {
    this.setState({ [name]: event.target.checked});
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const createOriginAndDestination = [
      this.props.postOrigin({address: this.state.originAddress}),
      this.props.postDestination({address: this.state.destinationAddress})
    ]

    Promise.all(createOriginAndDestination)
      .then(data => {
        const originId = data[0].payload.response.data.id
        const destinationId = data[0].payload.response.data.id
        // filtro todas las keys del estado que no sean id's de skyspots y las pongo en un arreglo
        let skyspotsObject = Object.assign({}, this.state);
        delete skyspotsObject.name
        delete skyspotsObject.originAddress
        delete skyspotsObject.destinationAddress
        delete skyspotsObject.openSuccess
        delete skyspotsObject.openFailure
        const skyspotsArray = Object.keys(skyspotsObject)

        this.props.postTrip({
          name: this.state.name,
          originId,
          destinationId,
          skyspotsArray
        }, this.showNotificationSuccess, this.showNotificationFailure)
      })
      .catch(err => {
        this.showNotificationFailure()
        console.log('err en el PromiseAll', err)
      })
  }
  showNotificationSuccess = () => {
    // filtro todas las keys del estado que no sean id's de skyspots y las pongo en false para resetear
    let skyspotsObject = Object.assign({}, this.state);
    delete skyspotsObject.name
    delete skyspotsObject.originAddress
    delete skyspotsObject.destinationAddress
    delete skyspotsObject.openSuccess
    delete skyspotsObject.openFailure
    Object.keys(skyspotsObject).forEach(key => skyspotsObject[key] = false)

    const newState = Object.assign({}, {
      openSuccess: true,
      name: '',
      originAddress: '',
      destinationAddress: ''
    }, skyspotsObject )

    this.setState(newState)

    setTimeout(function(){
            this.setState({openSuccess: false});
        }.bind(this),6000);
  }
  showNotificationFailure = () => {
    this.setState({
      openFailure: true, 
      name: '',
      originAddress: '',
      destinationAddress: ''
    });
    setTimeout(function(){
            this.setState({openFailure: false});
        }.bind(this),6000);
  }
  render() {
  const { classes, skyspots } = this.props
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Ruta</h4>
                  <p className={classes.cardCategoryWhite}>Agregar ruta</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Nombre"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: AEP-FTE',
                          value: this.state.name,
                          name: 'name'
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Origen"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: Buenos Aires, Argentina',
                          value: this.state.originAddress,
                          name: 'originAddress'
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Destino"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: El Calafate, Argentina',
                          value: this.state.destinationAddress,
                          name: 'destinationAddress'
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel focused={false} className={classes.formLabel}>Agregar Skyspots</FormLabel>
                        <FormGroup row>
                        {skyspots.data && skyspots.data.map(skyspot => {
                          return (
                            <FormControlLabel
                            key={skyspot.id}
                            control={
                              <Checkbox 
                                // defaultChecked={false}
                                checked={this.state[skyspot.id] || false} 
                                onChange={this.checkBox(skyspot.id)} 
                                value={skyspot.id.toString()}
                                color="primary" 
                              />
                            }
                            label={skyspot.name}
                          />
                          )
                        })}
                        </FormGroup>
                      </FormControl>
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
            message="Skyspot creado!"
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
            message="Hubo un error al crear este Skyspot"
            open={this.state.openFailure}
            closeNotification={() => this.setState({openFailure:false})}
            close
          />
        </div>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(AgregarRuta);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);
