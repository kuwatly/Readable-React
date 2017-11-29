import React, {Component} from 'react';
import { connect } from 'react-redux';
import PostDialog from './PostDialog';
import CommentDialog from './CommentDialog';
import {
  closePostDialog,
  closeCommentDialog,
} from '../actions/dailog';

class Dialogs extends Component {
  render() {
    const {
      isPostDialogOpen, closePostDialog,
      isCommentDialogOpen, closeCommentDialog,
    } = this.props;
    return (
      <div>
        <PostDialog
          open={isPostDialogOpen}
          onRequestClose={closePostDialog}/>
        <CommentDialog
          open={isCommentDialogOpen}
          onRequestClose={closeCommentDialog}/>
      </div>
    );
  }
}

function mapStateToProps({
                           postDialog: {openPostDialog: isPostDialogOpen},
                           commentDialog: { isOpen: isCommentDialogOpen },
                         }) {
  return { isPostDialogOpen, isCommentDialogOpen,}
}

function mapDispatchToProps (dispatch) {
  return {
    closePostDialog: () => dispatch(closePostDialog()),
    closeCommentDialog: () => dispatch(closeCommentDialog()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);