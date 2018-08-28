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

const mapStateToProps = state => ({
  skyspots: state.skyspots.skyspots,
  skyspotsOrderedToTable: state.skyspots.skyspotsOrderedToTable
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(skyspotActions, dispatch);
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
  componentDidMount() {
    this.props.getSkyspotsRequest()
      .then(data => console.log('this.props.skyspotsOrderedToTable', this.props.skyspotsOrderedToTable))
  }
  render() {
    const { classes, skyspotsOrderedToTable } = this.props;
    return (
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
                tableHead={["ID", "Nombre", "Latitud", "Longitud", "Link"]}
                tableData={skyspotsOrderedToTable}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

const styledComponent = withStyles(styles)(SkyspotsTable);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);