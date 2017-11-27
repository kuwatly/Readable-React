export const OPEN_POST_DIALOG = 'OPEN_POST_DIALOG';
export const CLOSE_POST_DIALOG = 'CLOSE_POST_DIALOG';
export const HANDLE_POST_DIALOG_CHANGE = 'HANDLE_POST_DIALOG_CHANGE';
export const OPEN_EDIT_POST_DIALOG = 'OPEN_EDIT_POST_DIALOG';
export const OPEN_COMMENT_DIALOG = 'OPEN_COMMENT_DIALOG';
export const CLOSE_COMMENT_DIALOG = 'CLOSE_COMMENT_DIALOG';
export const HANDLE_COMMENT_DIALOG_CHANGE = 'HANDLE_COMMENT_DIALOG_CHANGE';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const OPEN_EDIT_COMMENT_DIALOG = 'OPEN_EDIT_COMMENT_DIALOG';


export const openPostDialog = () => ({
  type: OPEN_POST_DIALOG
});

export const closePostDialog = () => ({
  type: CLOSE_POST_DIALOG
});

export const handlePostDialogChange = ({source, value}) => ({
  type: HANDLE_POST_DIALOG_CHANGE,
  source,
  value
});

export const openEditPostDialog = (post) => ({
  type: OPEN_EDIT_POST_DIALOG,
  post
});

export const openCommentDialog = () => ({
  type: OPEN_COMMENT_DIALOG
});

export const closeCommentDialog = () => ({
  type: CLOSE_COMMENT_DIALOG
});

export const handleCommentDialogChange = ({source, value}) => ({
  type: HANDLE_COMMENT_DIALOG_CHANGE,
  source,
  value
});

export const openEditCommentDialog = (comment) => ({
  type: OPEN_EDIT_COMMENT_DIALOG,
  comment
});
