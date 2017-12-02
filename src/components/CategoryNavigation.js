import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/category';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

const styles = {
  group: {
    flexGrow: 1,
    margin: "auto"
  },
  title: {
    marginTop: 30
  },
};

class CategoryNavigation extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    const categories = this.props.categories || [];
    const classes = this.props.classes;
    return (
      <div>
        <Grid container
              justify="center"
              align="center"
              spacing={24}>
          <Grid item key='home'>
            <Link to={`/`} style={{textDecoration: 'none'}}>
              <Button className={classes.button} raised color="primary">
                Home
              </Button>
            </Link>
          </Grid>
          {categories.map(((category, index) => (
            <Grid item key={index}>
              <Link to={`/${category.path}`} style={{textDecoration: 'none'}}>
                <Button className={classes.button} raised color="primary">
                  {category.name}
                </Button>
              </Link>
            </Grid>
          )))}
        </Grid>
        <p/>
      </div>

    );
  }
}

function mapStateToProps ({categories}) {
  return {
    categories: categories.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

const styledCategoryNavigation = withStyles(styles)(CategoryNavigation)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledCategoryNavigation);