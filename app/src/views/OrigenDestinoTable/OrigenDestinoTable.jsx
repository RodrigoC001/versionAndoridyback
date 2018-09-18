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
import * as originActions from "../../redux/actions/origins";
import * as destinationActions from "../../redux/actions/destinations";


// 
import Promise from 'bluebird';

// dialog

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const mapStateToProps = state => ({
  origins: state.origins.origins,
  originsOrderedToTable: state.origins.originsOrderedToTable,
  destinations: state.destinations.destinations,
  destinationsOrderedToTable: state.destinations.destinationsOrderedToTable,
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
  }
};

class OrigenDestinoTable extends React.Component {
  state = {
    openDelete: false,
    openEdit: false,
    originId: null,
    openDeleteDestination: false,
    openEditDestination: false,
    destinationId: null
  }
  componentDidMount() {
    this.props.getOriginsRequest();
    this.props.getDestinationsRequest();
  }
  handleDelete = (originId) => {
    // cada origen es a su vez un destino. en el back los tengo como cosas separadas, pero para hacer más comoda la UX, cuando borrar un origen se borra su clon de destino tambien.
    const createOriginAndDestination = [
      this.props.deleteOrigin(originId),
      this.props.deleteDestination(originId)
    ];

    Promise.all(createOriginAndDestination)
      .then(data => {
        this.props.getOriginsRequest();
        this.props.getDestinationsRequest();
      })
      .catch(error => {
        console.log('error', error)
        // this.showNotificationFailure()
      });

  }
  handleEdit = (originId) => {
    // this.props.history.push(`/skyspots/${skyspotId}`)
  }
  openDeleteModal = (originId) => {
    this.setState({ openDelete: true, originId: originId});
  }
  handleDeleteModalOk = () => {
    this.setState({ openDelete: false })
    this.state.originId && this.handleDelete(this.state.originId)
  }
  handleDeleteModalCancel = () => {
    this.setState({openDelete: false, originId: null})
  }
  openEditModal = (originId) => {
    this.setState({ openEdit: true, originId: originId});
  }
  handleEditModalOk = () => {
    this.setState({ openEdit: false });
    this.state.originId && this.handleEdit(this.state.originId);
  }
  handleEditModalCancel = () => {
    this.setState({openEdit: false, originId: null});
  }
  handleDeleteDestination = (destinationId) => {

    // cada origen es a su vez un destino. en el back los tengo como cosas separadas, pero para hacer más comoda la UX, cuando borrar un origen se borra su clon de destino tambien.
    const createOriginAndDestination = [
      this.props.deleteOrigin(destinationId),
      this.props.deleteDestination(destinationId)
    ];

    Promise.all(createOriginAndDestination)
      .then(data => {
        this.props.getOriginsRequest();
        this.props.getDestinationsRequest();
      })
      .catch(error => {
        console.log('error', error)
        // this.showNotificationFailure()
      });
  }
  handleEditDestination = (destinationId) => {
    // this.props.history.push(`/skyspots/${skyspotId}`)
  }
  openDeleteModalDestination = (destinationId) => {
    this.setState({ openDeleteDestination: true, destinationId: destinationId});
  }
  handleDeleteModalOkDestination = () => {
    this.setState({ openDeleteDestination: false })
    this.state.destinationId && this.handleDeleteDestination(this.state.destinationId)
  }
  handleDeleteModalCancelDestination = () => {
    this.setState({openDeleteDestination: false, destinationId: null})
  }
  openEditModalDestination = (destinationId) => {
    this.setState({ openEdit: true, destinationId: destinationId});
  }
  handleEditModalOkDestination = () => {
    this.setState({ openEdit: false });
    this.state.destinationId && this.handleEditDestination(this.state.destinationId);
  }
  handleEditModalCancelDestination = () => {
    this.setState({openEdit: false, destinationId: null});
  }  
  render() {
    const { classes, originsOrderedToTable, destinationsOrderedToTable } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Origenes</h4>
                <p className={classes.cardCategoryWhite}>
                  Tabla de Origenes
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Nombre", "", ""]}
                  tableData={originsOrderedToTable}
                  handleDelete={originId => this.openDeleteModal(originId)}
                  handleEdit={originId => this.openEditModal(originId)}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Destinos</h4>
                <p className={classes.cardCategoryWhite}>
                  Tabla de Destinos
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Nombre", "", ""]}
                  tableData={destinationsOrderedToTable}
                  handleDelete={destinationId => this.openDeleteModalDestination(destinationId)}
                  handleEdit={destinationId => this.openEditModalDestination(destinationId)}
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
                ¿Desea borrar este Origen & Destino?
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
                ¿Desea editar este Origen & Destino?
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

        <div>
          <Dialog
            open={this.state.openDeleteDestination}
            TransitionComponent={Transition}
            keepMounted
            // onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                ¿Desea borrar este Origen & Destino?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDeleteModalOkDestination} color="primary">
                Aceptar
              </Button>
              <Button onClick={this.handleDeleteModalCancelDestination} color="primary">
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.openEditDestination}
            TransitionComponent={Transition}
            keepMounted
            // onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                ¿Desea editar este Origen & Destino?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleEditModalOkDestination} color="primary">
                Aceptar
              </Button>
              <Button onClick={this.handleEditModalCancelDestination} color="primary">
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

const styledComponent = withStyles(styles)(OrigenDestinoTable);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);