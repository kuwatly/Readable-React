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

export default connect(mapStateToProps, { closePostDialog, closeCommentDialog })(Dialogs);