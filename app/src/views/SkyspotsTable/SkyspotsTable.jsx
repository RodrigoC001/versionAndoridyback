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
import * as skyspotActions from "../../redux/actions/skyspots";

// dialog

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const mapStateToProps = state => ({
  skyspots: state.skyspots.skyspots,
  skyspotsOrderedToTable: state.skyspots.skyspotsOrderedToTable
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(skyspotActions, dispatch);
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

class SkyspotsTable extends React.Component {
  state = {
    openDelete: false,
    openEdit: false,
    skyspotId: null
  }
  componentDidMount() {
    this.props.getSkyspotsRequest()
  }
  handleDelete = (skyspotId) => {
    this.props.deleteSkyspot(skyspotId)
      .then(deletedSkyspot => this.props.getSkyspotsRequest())
  }
  handleEdit = (skyspotId) => {
    this.props.history.push(`/skyspots/${skyspotId}`)
  }
  openDeleteModal = (skyspotId) => {
    this.setState({ openDelete: true, skyspotId: skyspotId});
  }
  handleDeleteModalOk = () => {
    this.setState({ openDelete: false })
    this.state.skyspotId && this.handleDelete(this.state.skyspotId)
  }
  handleDeleteModalCancel = () => {
    this.setState({openDelete: false, skyspotId: null})
  }
  openEditModal = (skyspotId) => {
    this.setState({ openEdit: true, skyspotId: skyspotId});
  }
  handleEditModalOk = () => {
    this.setState({ openEdit: false })
    this.state.skyspotId && this.handleEdit(this.state.skyspotId)
  }
  handleEditModalCancel = () => {
    this.setState({openEdit: false, skyspotId: null})
  }
  render() {
    const { classes, skyspotsOrderedToTable } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Skyspots</h4>
                <p className={classes.cardCategoryWhite}>
                  Tabla de Skyspots
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Nombre", "Latitud", "Longitud", "Link", "", ""]}
                  tableData={skyspotsOrderedToTable}
                  handleDelete={skyspotId => this.openDeleteModal(skyspotId)}
                  handleEdit={skyspotId => this.openEditModal(skyspotId)}
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
                ¿Desea borrar este Skyspot?
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
                ¿Desea editar este Skyspot?
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
    )
  }
}

const styledComponent = withStyles(styles)(SkyspotsTable);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);