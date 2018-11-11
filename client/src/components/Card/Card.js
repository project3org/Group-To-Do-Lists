import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

// Just holding my fetch request for the moment
// componentWillMount() {
//   // For each list user has
//   currentUser.lists.forEach(id => {
//     // Fetch list body using list id
//     fetch(`/api/lists/${id}`)
//       .then(res => res.json())
//       .then(listBody => {
//         console.log(listBody);
//       });
//   });
// };

class SimpleCard extends Component {

  render () {
    return (
      <Card className="text-center">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
          </Typography>
          <Typography variant="h5" component="h2">
          Task List Header
          </Typography>
          <Typography color="textSecondary" gutterBottom>
          Task list generated here
          </Typography>
          <Typography component="h6">
            <ul>
            <li>Task name </li>
            <li>Task name </li>
            <li>Task name </li>
            </ul>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">List Info</Button>
        </CardActions>
      </Card>
    );
  };
};

export default SimpleCard;