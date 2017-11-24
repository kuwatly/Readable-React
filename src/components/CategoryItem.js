import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

const styles = {
  card: {
    maxWidth: 345,
    padding: 30
  },
  media: {
    height: 50,
    width: 50,
  },
};

class CategoryItem extends Component {
  render() {
    const {name, path} = this.props.category;
    const image = `../images/${name}.svg`;
    const classes = this.props.classes;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image= {image}
          title="React"
        />
        <CardContent>
          <Typography type="display1">{name}</Typography>
          <Typography type="subheading">{`/${path}`}</Typography>
        </CardContent>
        <CardActions>
          <IconButton color='primary' aria-label="open" >{name}</IconButton>
        </CardActions>
      </Card>
    );
  }
}

CategoryItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryItem);