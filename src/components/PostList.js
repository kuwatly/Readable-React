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
import PostAdd from './PostAdd';
import {
  loadPosts, handlePostTableChange, removePost,
  handlePostContentsChange, voteDownPost, voteUpPost
} from '../actions/post';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import ExposurePlus1 from 'material-ui-icons/ExposurePlus1';
import ExposureNeg1 from 'material-ui-icons/ExposureNeg1';

const columnData = [
  { id: 'timestamp', numeric: false, disablePadding: true, label: 'Date and Time' },
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'body', numeric: false, disablePadding: true, label: 'Body' },
  { id: 'author', numeric: false, disablePadding: true, label: 'Author' },
  { id: 'category', numeric: false, disablePadding: true, label: 'Category' },
  { id: 'commentCount', numeric: true, disablePadding: false, label: 'Comments' },
  { id: 'voteScore', numeric: true, disablePadding: false, label: 'Vote Score' },
  { id: 'vote', numeric: false, disablePadding: false, label: 'Vote' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
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
  const { numSelected, classes, selected, removePost, handlePostTableChange } = props;

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
          <Typography type="title">All Posts</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => {
              selected.forEach(removePost);
              handlePostTableChange("numSelected", 0);
              handlePostTableChange("selected", []);
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
  removePost: PropTypes.func.isRequired,
  handlePostTableChange: PropTypes.func.isRequired,
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

class PostList extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }

  handleRequestSort = (event, property) => {
    const { handlePostTableChange, handlePostContentsChange } = this.props;
    const orderBy = property;
    let order = 'desc';

    if (this.props.orderBy === property && this.props.order === 'desc') {
      order = 'asc';
    }

    const posts =
      order === 'desc'
        ? this.props.posts.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.posts.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    handlePostContentsChange(posts);
    handlePostTableChange("order", order);
    handlePostTableChange("orderBy", orderBy);
  };

  handleSelectAllClick = (event, checked) => {
    const { handlePostTableChange } = this.props;
    if (checked) {
      handlePostTableChange("selected", this.props.posts.map(n => n.id));
      return;
    }
    handlePostTableChange("selected", []);
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { handlePostTableChange, selected } = this.props;
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

    handlePostTableChange("selected", newSelected);
  };

  handleChangePage = (event, page) => {
    const { handlePostTableChange } = this.props;
    handlePostTableChange("page", page);
  };

  handleChangeRowsPerPage = event => {
    const { handlePostTableChange } = this.props;
    handlePostTableChange("rowsPerPage", event.target.value);
  };

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { posts, order, orderBy, selected,
      rowsPerPage, page, removePost,
      handlePostTableChange, voteUpPost, voteDownPost } = this.props;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected ? selected.length : 0}
                              selected={selected} removePost={removePost}
                              handlePostTableChange ={handlePostTableChange}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected ? selected.length : 0}
              order={order ? order : 'desc'}
              orderBy={orderBy ? orderBy : 'voteScore'}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={posts ? posts.length : 0}
            />
            <TableBody>
              {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
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
                    <TableCell padding="none">{n.title}</TableCell>
                    <TableCell padding="none">{n.body}</TableCell>
                    <TableCell padding="none">{n.author}</TableCell>
                    <TableCell padding="none">{n.category}</TableCell>
                    <TableCell numeric>{n.commentCount}</TableCell>
                    <TableCell numeric>{n.voteScore}</TableCell>
                    <TableCell padding="none">
                      <Button color="primary" onClick={() => voteUpPost(n)}>
                        <ExposurePlus1/>
                      </Button>
                      <Button color="primary" onClick={() => voteDownPost(n)}>
                        <ExposureNeg1/>
                      </Button>
                    </TableCell>
                    <TableCell padding="none">
                      <Button className={classes.button} raised color="primary">
                        View Details
                        <Send className={classes.rightIcon}/>
                      </Button>

                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={posts ? posts.length : 0}
                  rowsPerPage={rowsPerPage ? rowsPerPage : 0}
                  page={page ? page : 0}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
          <PostAdd />
        </div>
      </Paper>
    );
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({
                           posts: {posts},
                           tables: {order, orderBy, selected, page, rowsPerPage},
                         }) {
  return {
    posts: posts,
    order: order,
    orderBy: orderBy,
    selected: selected,
    page: page,
    rowsPerPage: rowsPerPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlePostTableChange: (source, value) => dispatch(handlePostTableChange({source, value})),
    handlePostContentsChange: (posts) => dispatch(handlePostContentsChange(posts)),
    loadPosts: () => dispatch(loadPosts()),
    removePost: (post) => dispatch(removePost(post)),
    voteDownPost : (post) => dispatch(voteDownPost(post)),
    voteUpPost: (post) => dispatch(voteUpPost(post)),
  }
}

const styledPostList = withStyles(styles)(PostList);

export default connect(mapStateToProps, mapDispatchToProps)(styledPostList);