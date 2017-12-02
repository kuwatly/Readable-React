import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import { connect } from 'react-redux';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { timeConverter } from '../utils/utils';
import {
  deleteExistingComment, handleCommentContentsChange, voteDownComment,
  voteUpComment, loadComments,
} from '../actions/comment';
import { handleTableChange, } from '../actions/table';
import Button from 'material-ui/Button';
import ExposurePlus1 from 'material-ui-icons/ExposurePlus1';
import ExposureNeg1 from 'material-ui-icons/ExposureNeg1';
import CommentAdd from './CommentAdd';
import { openEditCommentDialog } from '../actions/dailog'
import { fetchPostDetails } from '../actions/post'
import PageNotFound from "./PageNotFound";

const columnData = [
  { id: 'timestamp', numeric: false, disablePadding: true, label: 'Date and Time' },
  { id: 'body', numeric: false, disablePadding: true, label: 'Body' },
  { id: 'author', numeric: false, disablePadding: true, label: 'Author' },
  { id: 'voteScore', numeric: true, disablePadding: false, label: 'Vote Score' },
  { id: 'vote', numeric: false, disablePadding: false, label: 'Vote' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Action' },
];

class EnhancedTableHead extends Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight: {
    backgroundColor: '#BBDEFB',
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, selected, removeComment, handleTableChange, tableTitle } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">{tableTitle}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => {
              selected.forEach(removeComment);
              handleTableChange("numSelected", 0);
              handleTableChange("selected", []);
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  removeComment: PropTypes.func.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  tableTitle: PropTypes.string.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '85%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  rightIcon: {
    marginLeft: 10,
  },
});

class CommentList extends Component {
  componentDidMount() {
    const { currentPostID, loadComments } = this.props;
    loadComments(currentPostID);
    fetchPostDetails(currentPostID);
  }

  handleRequestSort = (event, property) => {
    const { handleTableChange, handleCommentContentsChange } = this.props;
    const orderBy = property;
    let order = 'desc';

    if (this.props.orderBy === property && this.props.order === 'desc') {
      order = 'asc';
    }

    const comments =
      order === 'desc'
        ? this.props.comments.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.comments.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    handleCommentContentsChange(comments);
    handleTableChange("order", order);
    handleTableChange("orderBy", orderBy);
  };

  handleSelectAllClick = (event, checked) => {
    const { handleTableChange } = this.props;
    if (checked) {
      handleTableChange("selected", this.props.posts.map(n => n.id));
      return;
    }
    handleTableChange("selected", []);
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { handleTableChange, selected } = this.props;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    handleTableChange("selected", newSelected);
  };

  handleChangePage = (event, page) => {
    const { handleTableChange } = this.props;
    handleTableChange("page", page);
  };

  handleChangeRowsPerPage = event => {
    const { handleTableChange } = this.props;
    handleTableChange("rowsPerPage", event.target.value);
  };

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { comments, order, orderBy, selected,
      rowsPerPage, page, openEditCommentDialog, deleteExistingComment,
      handleTableChange, voteUpComment, voteDownComment, post } = this.props;
    let tableTitle = "";

    const commentsContents =  (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected ? selected.length : 0}
                              selected={selected} removeComment={deleteExistingComment}
                              handleTableChange ={handleTableChange}
                              tableTitle = {tableTitle}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected ? selected.length : 0}
              order={order ? order : 'desc'}
              orderBy={orderBy ? orderBy : 'voteScore'}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={comments ? comments.length : 0}
            />
            <TableBody>
              {comments ? comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox"
                               onClick={event => this.handleClick(event, n.id)}
                               onKeyDown={event => this.handleKeyDown(event, n.id)}>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding="none">{timeConverter(n.timestamp)}</TableCell>
                    <TableCell padding="none">{n.body}</TableCell>
                    <TableCell padding="none">{n.author}</TableCell>
                    <TableCell numeric>{n.voteScore}</TableCell>
                    <TableCell padding="none">
                      <Button color="primary" onClick={() => voteUpComment(n)}>
                        <ExposurePlus1/>
                      </Button>
                      <Button color="primary" onClick={() => voteDownComment(n)}>
                        <ExposureNeg1/>
                      </Button>
                    </TableCell>
                    <TableCell padding="none">
                      <Button dense color="primary" onClick={() => openEditCommentDialog(n)}>
                        Edit
                      </Button>
                      <Button dense color="primary" onClick={() => deleteExistingComment(n.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }) : null}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={comments ? comments.length : 0}
                  rowsPerPage={rowsPerPage ? rowsPerPage : 0}
                  page={page ? page : 0}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
          <CommentAdd />
        </div>
      </Paper>
    );

    return post && comments ? commentsContents : (<PageNotFound/>);
  }
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({
                           comments: {comments},
                           tables: {order, orderBy, selected, page, rowsPerPage},
                           post: {post}
                         }) {
  return {
    comments: comments,
    order: order,
    orderBy: orderBy,
    selected: selected,
    page: page,
    rowsPerPage: rowsPerPage,
    post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleCommentContentsChange: (comments) => dispatch(handleCommentContentsChange(comments)),
    deleteExistingComment: (comment) => dispatch(deleteExistingComment(comment)),
    voteDownComment : (comment) => dispatch(voteDownComment(comment)),
    voteUpComment: (comment) => dispatch(voteUpComment(comment)),
    loadComments: (id) => dispatch(loadComments(id)),
    openEditCommentDialog: (comment) => dispatch(openEditCommentDialog(comment)),
    handleTableChange: (source, value) => dispatch(handleTableChange({source, value})),
    fetchPostDetails: (id) => dispatch(fetchPostDetails(id)),
  }
}

const styledCommentList = withStyles(styles)(CommentList);

export default connect(mapStateToProps, mapDispatchToProps)(styledCommentList);