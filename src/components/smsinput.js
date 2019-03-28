import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function Inputs(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>

      <Input
        placeholder="Name"
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />

      <Input
        placeholder="Phone Number"
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />

    <TextField
          id="standard-textarea"
          label="your message"
          placeholder="message"
          multiline
          className={classes.textField}
          margin="normal"
        />

    </div>
  );
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);