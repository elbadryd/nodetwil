import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingActionButton(props) {
  const { classes, handleSendSms } = props;
  return (
    <div onClick={handleSendSms}>
      <Fab variant="extended" aria-label="Send" className={classes.fab}>
        <NavigationIcon className={classes.extendedIcon} />
        Send
      </Fab>
    </div>
  );
}

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButton);
