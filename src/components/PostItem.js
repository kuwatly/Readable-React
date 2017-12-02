import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ExposurePlus1 from 'material-ui-icons/ExposurePlus1';
import ExposureNeg1 from 'material-ui-icons/ExposureNeg1';
import Avatar from 'material-ui/Avatar';
import { fetchPostDetails } from '../actions/post';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import {
  voteDownPost, voteUpPost, removePost
} from '../actions/post';
import { openEditPostDialog } from '../actions/dailog';
import { fetchCategories } from '../actions/category';
import { timeConverter } from '../utils/utils';

const styles = {
  card: {
    maxWidth: 480,
    Height: 100,
    padding: 30
  },
  media: {
    height: 50,
    width: 50,
  },
  avatar: {
    backgroundColor: '#E91E63',
    padding: 10,
  },
};

class PostItem extends Component {
  componentDidMount() {
    const { currentPostID, fetchPostDetails, fetchCategories } = this.props;
    fetchPostDetails(currentPostID);
    fetchCategories();
  }

  render() {
    const {currentCategory, post, openEditPostDialog,
      voteUpPost, voteDownPost, removePost } = this.props;
    const image = `../images/${currentCategory}.svg`;
    const classes = this.props.classes;
    const postContents = post && (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Post" className={classes.avatar}>
              Post
            </Avatar>
          }
          title = {`${post.title} - ${post.author}`}
          subheader = {`${post.body} - ${timeConverter(post.timestamp)}`}
        />
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Typography type="body1">{currentCategory}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography type="body1">Vote Score: {post.voteScore}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography type="body1">Comments: {post.commentCount}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <CardMedia
                className={classes.media}
                image={image}
                title={currentCategory}
              />
            </Grid>
            <Grid item xs={3}>
              <Button color="primary" onClick={() => voteUpPost(post)}>
                <ExposurePlus1/>
              </Button>
              <Button color="primary" onClick={() => voteDownPost(post)}>
                <ExposureNeg1/>
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button dense color="primary" onClick={() => openEditPostDialog(post)}>
                Edit
              </Button>
              <Button dense color="primary" onClick={() => removePost(post.id)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
    return postContents;
  }
}

PostItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps( { post: {post} } ) {
  return { post };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostDetails: (id) => dispatch(fetchPostDetails(id)),
    voteDownPost : (post) => dispatch(voteDownPost(post)),
    voteUpPost: (post) => dispatch(voteUpPost(post)),
    openEditPostDialog: (post) => dispatch(openEditPostDialog(post)),
    fetchCategories: () => dispatch(fetchCategories()),
    removePost: (id) => dispatch(removePost(id))
  }
}

const styledPostItem = withStyles(styles)(PostItem);

export default connect(mapStateToProps, mapDispatchToProps)(styledPostItem);
