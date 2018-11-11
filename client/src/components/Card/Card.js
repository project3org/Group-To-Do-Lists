import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes, children } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
<<<<<<< HEAD
        {/* <Typography variant="h5" component="h2">
          {props.listTitle} // leaving this commented out for now. 
        </Typography> */}
        <Typography component="p">
          {children}
=======
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="h2">
         Task List Header
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Task list generated here
        </Typography>
        <Typography component="h6">
          <ul>
          <li>Task name </li>
          <li>Task name </li>
          <li>Task name </li>
          </ul>
>>>>>>> 69159c716e2da0f28c6849625c4ab146eb9b7cc2
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">List Info</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);