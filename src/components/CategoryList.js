import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/category';
import { withStyles } from 'material-ui/styles';
import CategoryItem from "./CategoryItem";

const styles = {
  group: {
    flexGrow: 1,
    margin: "auto"
  },
  title: {
    marginTop: 30
  },
};

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    const categories = this.props.categories || [];
    return (
      <div>
        <Grid container
              justify="center"
              align="center"
              spacing={24}>

          {categories.map(((category, index) => (
            <Grid item key={index}>
              <CategoryItem category={category}/>
            </Grid>
          )))}
        </Grid>
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

const styledCategoryList = withStyles(styles)(CategoryList)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledCategoryList);