import React, {Component} from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import YesIcon from 'material-ui-icons/CheckCircle';
import CancelIcon from 'material-ui-icons/Cancel';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';
import {
  handlePostDialogChange,
} from '../actions/dailog';
import {
  addPost,
  editPost,
} from '../actions/post'

class PostDialog extends Component {
  setCurrentCategory() {
    const {
      currentCategory,
      handlePostDialogChange
    } = this.props;
    if (currentCategory) {
      handlePostDialogChange("category", currentCategory);
    }
  }

  render() {
    const {
      title, body, author, category, id,
      onRequestClose, open,
      addPost, editPost, handlePostDialogChange,
      currentCategory, categories,
      isEdit, okDisabled,
      isTitleError, isAuthorError, isBodyError, isCategoryError,
    } = this.props;
    const yesButtonColor = okDisabled? "primary": "default";
    const dialogTitle = isEdit? "Edit Post": `Create New ${currentCategory||""} Post`;
    return (
      <Dialog
        open={open}
        onRequestClose={onRequestClose}
        transition={Slide}
        onEntered={() => this.setCurrentCategory()}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            required autoFocus fullWidth
            error={isTitleError}
            onChange={(event) =>
              handlePostDialogChange("title", event.target.value)}
            label="Title"
            defaultValue={title}
            margin="normal"/>
          <TextField
            required multiline fullWidth
            error={isBodyError}
            onChange={(event) =>
              handlePostDialogChange("body", event.target.value)}
            label="Body"
            defaultValue={body}
            margin="normal"/>
          <TextField
            required disabled={isEdit} fullWidth
            error={isAuthorError}
            onChange={(event) =>
              handlePostDialogChange("author", event.target.value)}
            label="Author"
            defaultValue={author}
            margin="normal"/>
          <InputLabel
            required disabled={!!currentCategory || isEdit}
            htmlFor="category">Category</InputLabel>
          <Select
            required disabled={!!currentCategory || isEdit}
            native fullWidth
            value={category || currentCategory}
            onChange={(event) =>
              handlePostDialogChange("category", event.target.value)}
            error={isCategoryError}
            input={<Input id="category"/>}
          >
            <option key="empty" value=""/>
            {
              categories.map((category) => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => onRequestClose()}
                      color="default">
            <CancelIcon/>
          </IconButton>
          <IconButton
            disabled={!okDisabled}
            onClick={() => {
              isEdit ? editPost(id, title, body) : addPost({title, body, category, author})
            }}
            color={yesButtonColor}>
            <YesIcon/>
          </IconButton>
        </DialogActions>
      </Dialog>
    );
  }
}

const isError = (content) => (content === undefined? false: !content);

const isValidCategory = (categories, category, isStrict) => {
  if (category === undefined && !isStrict) {
    return true;
  }
  return categories.map((cat) => cat.name).includes(category);
};

function mapStateToProps ({
                            categories: {categories, currentCategory},
                            postDialog: {title, body, category, author, isEdit, id}
                          }) {
  return {
    isEdit,
    title, body, category, author, id,
    currentCategory: currentCategory,
    isTitleError: isError(title),
    isBodyError: isError(body),
    isCategoryError: isError(category) || !isValidCategory(categories, category),
    isOwnerError: isError(author),
    okDisabled: !!title && !!author &&!!body && isValidCategory(categories, category, true),
    categories: categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handlePostDialogChange: (source, value) => dispatch(handlePostDialogChange({source, value})),
    addPost: (post) => dispatch(addPost(post)),
    editPost: (id, title, body) => dispatch(editPost({id, title, body}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDialog);