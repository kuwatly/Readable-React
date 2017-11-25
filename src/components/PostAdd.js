import React, {Component} from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { openPostDialog } from '../actions/dailog';

class PostAdd extends Component {
  render() {
    const { openPostDialog } = this.props;
    return (
      <Button
        fab
        style={fabStyle}
        aria-label="add post"
        onClick={openPostDialog}>
        <AddIcon />
      </Button>
    );
  }
}

const fabStyle = {
  color: '#FFFFFF',
  backgroundColor: '#E91E63',
  margin: 0,
  top: 'auto',
  right: 30,
  bottom: 30,
  left: 'auto',
  position: 'fixed',
};

function mapDispatchToProps (dispatch) {
  return {
    openPostDialog: () => dispatch(openPostDialog())
  }
}

export default connect(null, mapDispatchToProps)(PostAdd);