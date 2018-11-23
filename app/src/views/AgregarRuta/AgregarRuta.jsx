import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  skyspots: state.skyspots.skyspots,
  origins: state.origins.origins,
  destinations: state.destinations.destinations
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
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  formControl: {
    marginTop: 20,
    marginBottom: 20
  },
  expansion: {
    marginTop: 20
  },
  scroll: {
    height: 110,
    width: 400,
    overflow: 'scroll'
  },
  menu: {
    width: 250,
  },
  textField: {
    width: 250,
  }
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
    this.props.getOriginsRequest();
    this.props.getDestinationsRequest();
  }
  showSkyspots = (event, expanded) => {
    expanded && this.props.getSkyspotsRequest()
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChangeSelector = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }
  checkBox = name => event => {
    this.setState({ [name]: event.target.checked});
  }
/*  handleSubmit = (event) => {
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
  }*/
  handleSubmit = (event) => {
    console.log('cuando entra al handle submit, el estado es', this.state)

    const originId = this.state.originAddress
    const destinationId = this.state.destinationAddress
    // filtro todas las keys del estado que no sean id's de skyspots y las pongo en un arreglo
    let skyspotsObject = Object.assign({}, this.state);
    delete skyspotsObject.name
    delete skyspotsObject.originAddress
    delete skyspotsObject.destinationAddress
    delete skyspotsObject.openSuccess
    delete skyspotsObject.openFailure
    const skyspotsArrayNotFiltered = Object.keys(skyspotsObject)
    // filter only the true values
    const skyspotsArray = skyspotsArrayNotFiltered.filter(key => skyspotsObject[key])
  
    event.preventDefault();

    console.log('skyspotsArray', skyspotsArray)
    
    if(this.state.name === '') return this.showNotificationFailure()
    if(this.state.originAddress === '') return this.showNotificationFailure()
    if(this.state.destinationAddress === '') return this.showNotificationFailure()
    if(skyspotsArray.length === 0) return this.showNotificationFailure()


    this.props.postTrip({
      name: this.state.name,
      originId,
      destinationId,
      skyspotsArray
    }, this.showNotificationSuccess, this.showNotificationFailure)
      
  }
  showNotificationSuccess = () => {
    console.log('entra aca?')
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

    console.log('skyspotsObject', skyspotsObject)

    this.setState(newState, ()=> console.log('el estado actual es, en el show notifications succcess', this.state))

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
  const { classes, skyspots, origins, destinations } = this.props
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
                <CardFooter>
                  <Button type="submit" color="primary">Enviar</Button>
                </CardFooter>
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
                      <TextField
                        id="origin-id"
                        select
                        label="Origen"
                        className={classes.textField}
                        value={this.state.originAddress}
                        onChange={this.handleChangeSelector('originAddress')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Ej.: Buenos Aires, Argentina"
                        margin="normal"
                      >
                        {origins && origins.map(origin => (
                          <MenuItem key={origin.id} value={origin.id}>
                            {origin.address}
                          </MenuItem>
                        ))}
                      </TextField>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="destination-id"
                        select
                        label="Destino"
                        className={classes.textField}
                        value={this.state.destinationAddress}
                        onChange={this.handleChangeSelector('destinationAddress')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText="Ej.: El Calafate, Argentina"
                        margin="normal"
                      >
                        {destinations && destinations.map(destination => (
                          <MenuItem key={destination.id} value={destination.id}>
                            {destination.address}
                          </MenuItem>
                        ))}
                      </TextField>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <ExpansionPanel className={classes.expansion} onChange={(event, expanded)=> this.showSkyspots(event, expanded)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.formLabel}>Agregar Skyspots</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <FormControl component="fieldset" className={classes.formControl}>
                            {/*<div className={classes.scroll}>*/}
                            <FormGroup >
                            {skyspots && skyspots.map(skyspot => {
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
                            {/*</div>*/}
                          </FormControl>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
        <div>
          <Snackbar
            place="bc"
            color="success"
            icon={AddAlert}
            message="Ruta creada!"
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

const styledComponent = withStyles(styles)(AgregarRuta);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);