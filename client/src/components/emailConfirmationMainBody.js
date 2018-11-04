// Import react and dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Creating styles for the component
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 75,
    marginBottom: 100
  },
  button: {
      margin: 50,
  }
});

// Creating component
function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h3" component="h3">
            Email Verification
        </Typography>
        <hr />
        <Typography variant="h5" component="p">
            You're almost done!
            <br /><br />
            Please click the button below to verify your email.
        </Typography>
        <br />
        <div className="text-center" style={styles.button}>
            <button className="btn btn-primary" onClick={props.verify}>Verify Email</button>
        </div>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Exporting Component w/ styles
export default withStyles(styles)(PaperSheet);