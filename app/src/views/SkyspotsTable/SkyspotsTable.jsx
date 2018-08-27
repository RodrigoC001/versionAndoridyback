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

function SkyspotsTable(props) {
  const { classes } = props;
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
              tableData={[
                ["1", "Niger", "Oud-Turnhout", "$36,738", "https://aireapp.org/2018/07/19/represa-yacireta/"],
                ["1", "Curaçao", "Sinaai-Waas", "$23,789", "https://aireapp.org/2018/07/19/represa-yacireta/"],
                ["1", "Netherlands", "Baileux", "$56,142", "https://aireapp.org/2018/07/19/represa-yacireta/"],
                ["1", "Korea, South", "Overland Park", "$38,735", "https://aireapp.org/2018/07/19/represa-yacireta/"],
                ["1", "Malawi", "Feldkirchen in Kärnten", "$63,542", "https://aireapp.org/2018/07/19/represa-yacireta/"],
                ["1", "Chile", "Gloucester", "$78,615", "https://aireapp.org/2018/07/19/represa-yacireta/"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(SkyspotsTable);
