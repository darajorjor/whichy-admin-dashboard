import React, { Component, Fragment } from 'react'
import Navbar from 'app/components/Navbar'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import TablePaginationActionsWrapped from 'common/TablePaginationActionsWrapped'
import Row from './components/Row'
import CreateQuestion from './components/CreateQuestion'
import QuestionsList from './components/QuestionsList'
import { withStyles } from 'material-ui/styles'

@withStyles(theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  table: {
    width: '100%',
  },
  paper: {
    margin: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  loading: {
    position: 'absolute',
    top: '450px',
    left: '50%',
    justifyContent: 'center',
    alignContent: 'center',
  },
}))
export default class ItemsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // gameFilter: null,
      items: [],
      page: 0,
      rowsPerPage: 10,
    }
  }

  search() {
    const { data: { itemsRefetch } } = this.props
    const {
      gameFilter,
    } = this.state
    /* eslint-disable */
    const app_id = gameFilter && gameFilter !== 'all' ? gameFilter : undefined

    return itemsRefetch({
      query: {
        app_id
      }
    })
      .then(({ results }) => {
        this.setState({
          items: [
            ...this.state.items,
            ...results,
          ],
          page: 0,
        })
      })
  }

  handleChangePage = (event, page) => {
    const { data: { itemsRefetch } } = this.props
    const {
      gameFilter,
    } = this.state
    /* eslint-disable */
    const app_id = gameFilter && gameFilter !== 'all' ? gameFilter : null

    const query = {
      page: page + 1,
    }

    if (app_id) {
      query.app_id = app_id
    }

    return itemsRefetch({
      query: query,
    })
      .then(({ results }) => {
        this.setState({
          page,
          items: [
            ...this.state.items,
            ...results,
          ],
        })
      })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { classes } = this.props
    const { rowsPerPage, page } = this.state

    const items = {
      results: [],
      count: 0,
    }
    return (
      <div>
        <Navbar title='Questions' />

        <CreateQuestion />

        <div
          className={classes.paper}
        >
          <Paper>
            <Table
              className={classes.table}
            >
              <TableBody>
                <QuestionsList />
              </TableBody>
            </Table>
          </Paper>
        </div>

      </div>
    )
  }
}
