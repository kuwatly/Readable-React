export const OPEN_POST_DIALOG = 'OPEN_POST_DIALOG';
export const CLOSE_POST_DIALOG = 'CLOSE_POST_DIALOG';
export const HANDLE_POST_DIALOG_CHANGE = 'HANDLE_POST_DIALOG_CHANGE';
export const OPEN_EDIT_POST_DIALOG = 'OPEN_EDIT_POST_DIALOG';

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
