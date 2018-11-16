// Import react and dependencies
import React from 'react';
import toastr from 'toastr';
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
    margin: "30px",
  },
  card: {
    marginTop: 75,
    // minHeight: "100%"
  }
});

// Handles 'Request New Token' button
const newToken = () => {
  // Targets the current token
  const currentToken = window.location.pathname.substr(22);

  // Locates user associated with current token
  fetch(`/api/account/secret?token=${currentToken}`)
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        // Display a success message telling user to check their email
        // Creates toastr options
        toastr.options = {
          "closeButton": true,
          "positionClass": "toast-top-right",
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };

        // Sends toastr success message to user
        toastr.success("Please follow the link sent to your email. Link only valid for one hour!", "New Token Sent");

        // Returns server message
        return json.message;

      } else {
        // Returns server message
        return json.message;
      }
    });
};

// Creating component
function PaperSheet(props) {
  const { classes } = props;

  return (
    <div className={classes.card}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h3" component="h3">
            Email Verification
        </Typography>
        <hr />
        <Typography variant="h5" component="p">
            You're almost done!
            <br /><br />
            Please click the 'Verify Email' button below to verify your email. If your token is expired, please click 'Request New Token'.
        </Typography>
        <br />
        <div className={`text-center ${classes.button}`}>
            <button className="btn btn-primary" onClick={props.verify} style={{marginRight: 100}}>Verify Email</button>
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