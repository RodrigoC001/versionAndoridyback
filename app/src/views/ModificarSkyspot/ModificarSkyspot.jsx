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

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as skyspotActions from "../../redux/actions/skyspots";

// Alert components
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "Components/Snackbar/Snackbar.jsx"

// Spinner
import CircularProgress from '@material-ui/core/CircularProgress';



const mapStateToProps = state => ({
  createdSkyspot: state.skyspots.createdSkyspot,
  skyspot: state.skyspots.skyspot
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(skyspotActions, dispatch);
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

class ModificarSkyspot extends React.Component {
  state = {
    name: '',
    data: '',
    latitude: '',
    longitude: '',
    openSuccess: false,
    openFailure: false,
    fetching: true
  }
  componentDidMount() {
    const { id } = this.props.match.params

    this.props.getSkyspotRequest(id)
      .then(skyspot => {
        const { name, data, latitude, longitude } = this.props.skyspot.data

        this.setState({
          name,
          data,
          latitude,
          longitude,
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

    this.props.putSkyspot(id, {
      name: this.state.name, 
      data: this.state.data, 
      latitude: this.state.latitude, 
      longitude: this.state.longitude
    }, this.showNotificationSuccess, this.showNotificationFailure)
  }
  showNotificationSuccess = () => {
    this.setState({
      openSuccess: true, 
      name: '', 
      data: '', 
      latitude: '', 
      longitude: ''
    });
    setTimeout(function(){
            this.setState({openSuccess: false},()=> this.props.history.push('/tablaskyspots'));
        }.bind(this),1000);
  }
  showNotificationFailure = () => {
    this.setState({
      openFailure: true, 
      name: '', 
      data: '', 
      latitude: '', 
      longitude: ''
    });
    setTimeout(function(){
            this.setState({openFailure: false});
        }.bind(this),6000);
  }
  render() {
  const { classes } = this.props;
  if(this.state.fetching || !this.props.skyspot) return (<div className={classes.spinnerContainer}><CircularProgress className={classes.progress}/></div>)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{this.props.skyspot && this.props.skyspot.data.name}</h4>
                  <p className={classes.cardCategoryWhite}>Modificar Skyspot</p>
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
                          placeholder: 'Ej.: Pozos petroleros Comodoro Rivadavia',
                          value: this.state.name,
                          name: 'name'
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Latitud"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: -67.6205063',
                          value: this.state.latitude,
                          name: 'latitude',
                          type: 'number'
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Longitud"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: -38.3944152',
                          value: this.state.longitude,
                          name: 'longitude',
                          type: 'number'
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Link"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: 'Ej.: https://aireapp.org/2018/07/19/represa-yacireta/',
                          value: this.state.data,
                          name: 'data'
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
            message="Skyspot modificado!"
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
            message="Hubo un error al intentar modificar este Skyspot"
            open={this.state.openFailure}
            closeNotification={() => this.setState({openFailure:false})}
            close
          />
        </div>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(ModificarSkyspot);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);