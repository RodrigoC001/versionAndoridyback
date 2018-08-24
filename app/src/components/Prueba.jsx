import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  },
  gridItem: {
    padding: "0 15px !important"
  }
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class TextFields extends React.Component {
  state = {
    name: '',
    origin: '',
    destination: ''
  }

  componentDidMount() {
    console.log('cpd')
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, ()=> console.log(this.state));
  }
  handleSubmit = (event) => {
    console.log('entra aca?')
     //Make a network call somewhere
     event.preventDefault();
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>

      <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField
          id="name"
          label="Nombre de la Ruta"
          value={this.state.name}
          onChange={this.handleChange('name')}
          placeholder="Ej.: AEP-FTE"
          className={classes.textField}
          margin="normal"
        />
        
        <TextField
          id="origin"
          label="Origen de la Ruta"
          value={this.state.origin}
          onChange={this.handleChange('origin')}
          placeholder="Ej.: Buenos Aires, Argentina"
          className={classes.textField}
          margin="normal"
        />
        
        <TextField
          id="with-placeholder"
          label="Destino de la Ruta"
          value={this.state.destination}
          onChange={this.handleChange('destination')}
          placeholder="Ej.: El Calafate, Argentina"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="full-width"
          label="Label"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
        />
        <Button  type="submit" variant="contained" color="primary">
          Hello World
        </Button>
      </form>

      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);