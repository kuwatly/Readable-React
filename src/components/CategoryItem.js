import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';

const styles = {
  card: {
    maxWidth: 345,
    padding: 30
  },
  media: {
    height: 50,
    width: 50,
  },
  rightIcon: {
    marginLeft: 10,
  },
};

class CategoryItem extends Component {
  render() {
    const {name, path, detailView} = this.props.category;
    const image = `../images/${name}.svg`;
    const classes = this.props.classes;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image= {image}
          title={name}
        />
        <CardContent>
          <Typography type="display1">{name}</Typography>
        </CardContent>
        { !detailView && (
            <CardActions>
              <Link to={`/${path}`} style={{textDecoration: 'none'}}>
                <Button className={classes.button} raised color="primary">
                  {name}
                  <Send className={classes.rightIcon}/>
                </Button>
              </Link>
            </CardActions>
          )}
      </Card>
    );
  }
}

CategoryItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryItem);