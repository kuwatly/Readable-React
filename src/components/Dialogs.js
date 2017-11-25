import React, {Component} from 'react';
import { connect } from 'react-redux';
import PostDialog from './PostDialog';
import {
  closePostDialog,
} from '../actions/dailog';

class Dialogs extends Component {
  render() {
    const {
      isPostDialogOpen, closePostDialog,
    } = this.props;
    return (
      <div>
        <PostDialog
          open={isPostDialogOpen}
          onRequestClose={closePostDialog}/>
      </div>
    );
  }
}

function mapStateToProps({ dialogs: {openPostDialog: isPostDialogOpen} }) {
  return { isPostDialogOpen }
}

function mapDispatchToProps (dispatch) {
  return {
    closePostDialog: () => dispatch(closePostDialog()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);