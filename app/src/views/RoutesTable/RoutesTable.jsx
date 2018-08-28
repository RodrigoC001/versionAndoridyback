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

const mapStateToProps = state => ({
  trips: state.trips.trips,
  tripsOrderedToTable: state.trips.tripsOrderedToTable
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(tripActions, dispatch);
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

class RoutesTable extends React.Component {
  componentDidMount() {
    this.props.getTripsRequest()
  }
  render() {
    const { classes, tripsOrderedToTable } = this.props;
    return (
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
              tableHead={["ID", "Nombre", "Origen", "Destino", "Skyspots"]}
              tableData={tripsOrderedToTable}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    );
  }
}

const styledComponent = withStyles(styles)(RoutesTable);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);
