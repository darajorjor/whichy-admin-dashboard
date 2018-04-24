import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { TableCell, TableRow } from 'material-ui/Table'
import Button from 'material-ui/Button'
import api from 'app/helpers/ApiHOC'
import { withStyles } from 'material-ui/styles'
import Delete from 'material-ui-icons/Delete'
import CircularIndeterminate from 'common/CircularIndeterminate'
// import styles from './style.scss'

@api((props) => ({
  url: `questions/${props.id}`,
  method: 'DELETE',
  name: 'deleteItem',
}))
@withStyles(theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  deleteBox: {
    position: 'relative',
  },
  loadingbox: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    right: '100px',
    top: '1px',
  },
}))
export default class Row extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
  }

  handleDelete = (id) => () => {
    const { store } = this.context
    const { data: { mutateStore, deleteItem } } = this.props

    const { questions } = store.getState().ApiHOC.root
    deleteItem()
      .then(() => mutateStore('questions', { ...questions, results: questions.results.filter(i => i.id !== id) }))
      .catch(() => alert('Couldn\'t delete item'))
  }

  render() {
    const {
      data: {
        deleteItemLoading
      },
      createdAt,
      classes,
      style,
      value,
    } = this.props

    return (
      <TableRow style={style}>
        <TableCell className={classes.deleteBox} numeric>
          {
            deleteItemLoading &&
            <div className={classes.loadingbox}>
              <CircularIndeterminate />
            </div>
          }
          {
            !deleteItemLoading &&
            <Button className={classes.button} variant="raised" color="secondary" onClick={this.handleDelete(value.id)}>
              Delete
              <Delete className={classes.rightIcon} />
            </Button>
          }
        </TableCell>
        <TableCell style={{ textAlign: 'right' }}>{value.but}</TableCell>
        <TableCell style={{ textAlign: 'right' }}>{value.whatif}</TableCell>
      </TableRow>
    )
  }
}
