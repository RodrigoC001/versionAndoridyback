import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "Components/Grid/GridItem.jsx";
import GridContainer from "Components/Grid/GridContainer.jsx";
import Table from "Components/Table/Table.jsx";
import Card from "Components/Card/Card.jsx";
import CardHeader from "Components/Card/CardHeader.jsx";
import CardBody from "Components/Card/CardBody.jsx";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tripActions from "../../redux/actions/trips";

// dialog

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';


const mapStateToProps = state => ({
  trips: state.trips.trips,
  tripsOrderedToTable: state.trips.tripsOrderedToTable,
  fetching: state.trips.fetching
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(tripActions, dispatch);
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  center: {
    textAlign: 'center'
  }
};

class RoutesTable extends React.Component {
  state = {
    openDelete: false,
    openEdit: false,
    tripId: null
  }
  componentDidMount() {
    console.log('this.props.fetching', this.props.fetching)
    this.props.getTripsRequest()
  }
  handleDelete = (tripId) => {
    this.props.deleteTrip(tripId)
      .then(deletedTrip => this.props.getTripsRequest())
  }
  handleEdit = (tripId) => {
    this.props.history.push(`/trips/${tripId}`)
  }
  openDeleteModal = (tripId) => {
    this.setState({ openDelete: true, tripId: tripId});
  }
  handleDeleteModalOk = () => {
    this.setState({ openDelete: false })
    this.state.tripId && this.handleDelete(this.state.tripId)
  }
  handleDeleteModalCancel = () => {
    this.setState({openDelete: false, tripId: null})
  }
  openEditModal = (tripId) => {
    this.setState({ openEdit: true, tripId: tripId});
  }
  handleEditModalOk = () => {
    this.setState({ openEdit: false })
    this.state.tripId && this.handleEdit(this.state.tripId)
  }
  handleEditModalCancel = () => {
    this.setState({openEdit: false, tripId: null})
  }
  render() {
    const { classes, tripsOrderedToTable, fetching } = this.props;
    if(fetching) return <div className={classes.center}><CircularProgress className={classes.progress} size={50} /></div>
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Rutas</h4>
              <p className={classes.cardCategoryWhite}>
                Tabla de Rutas
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Nombre", "Origen", "Destino", "Skyspots", "", ""]}
                tableData={tripsOrderedToTable}
                handleDelete={tripId => this.openDeleteModal(tripId)}
                handleEdit={tripId => this.openEditModal(tripId)}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <div>
        <Dialog
          open={this.state.openDelete}
          TransitionComponent={Transition}
          keepMounted
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ¿Desea borrar esta Ruta?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteModalOk} color="primary">
              Aceptar
            </Button>
            <Button onClick={this.handleDeleteModalCancel} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={this.state.openEdit}
          TransitionComponent={Transition}
          keepMounted
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ¿Desea editar esta Ruta?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleEditModalOk} color="primary">
              Aceptar
            </Button>
            <Button onClick={this.handleEditModalCancel} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    );
  }
}

const styledComponent = withStyles(styles)(RoutesTable);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);