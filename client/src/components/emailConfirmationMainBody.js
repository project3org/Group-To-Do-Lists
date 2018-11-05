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

// Handles 'Request New Token' button
const newToken = () => {
  // Targets the current token
  const currentToken = window.location.pathname.substr(22);

  // Locates user associated with current token
  fetch(`/api/account/user?token=${currentToken}`)
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        console.log(json.message);
        return json.message;
      } else {
        console.log(json.message);
        return json.message;
      }
    });
};

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
            Please click the 'Verify Email' button below to verify your email. If your token is expired, please click 'Request New Token'
        </Typography>
        <br />
        <div className="text-center" style={styles.button}>
            <button className="btn btn-primary" onClick={props.verify}>Verify Email</button>
            <button className="btn btn-secondary" onClick={newToken}>Request New Token</button>
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