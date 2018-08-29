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
import * as tripActions from "../../redux/actions/trips";

const mapStateToProps = state => ({
  createdOrigin: state.origins.createdOrigin,
  createdDestination: state.origins.createdDestination,
  createdTrip: state.trips.createdTrip
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      originActions,
      destinationActions,
      tripActions,
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
  }
};

class AgregarRuta extends React.Component {
  state = {
    name: '',
    originAddress: '',
    destinationAddress: ''
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, ()=> console.log(this.state));
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('entra aca')
    const createOriginAndDestination = [
      this.props.postOrigin({address: this.state.originAddress}),
      this.props.postDestination({address: this.state.destinationAddress})
    ]
    Promise.all(createOriginAndDestination)
      .then(data => {
        const originId = data[0].payload.response.data.id
        const destinationId = data[0].payload.response.data.id
        this.props.postTrip({
          name: this.state.name,
          originId,
          destinationId
        })
          .then(trip => console.log('trip', trip))
      })
      .catch(err => console.log('err en el PromiseAll', err))
  }
  render() {
  const { classes } = this.props
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
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">Enviar</Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(AgregarRuta);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);
