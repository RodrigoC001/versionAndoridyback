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

const mapStateToProps = state => ({
  createdOrigin: state.origins.createdOrigin,
  createdDestination: state.origins.createdDestination,
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
  }
};

class AgregarOrigenDestino extends React.Component {
  state = {
    address: '',
    openSuccess: false,
    openFailure: false
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.address === '') return this.showNotificationFailure()

    const createOriginAndDestination = [
      this.props.postOrigin({address: this.state.address}),
      this.props.postDestination({address: this.state.address})
    ]

    Promise.all(createOriginAndDestination)
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
            this.setState({openSuccess: false});
        }.bind(this),6000);
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
  const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Origen & Destino</h4>
                  <p className={classes.cardCategoryWhite}>Agregar Origen & Destino</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Dirección"
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