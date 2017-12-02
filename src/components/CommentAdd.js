import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

export default function CommentAdd({openCommentDialog}) {
    return (
      <Button
        fab
        style={fabStyle}
        aria-label="add comment"
        onClick={openCommentDialog}>
        <AddIcon />
      </Button>
    );
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