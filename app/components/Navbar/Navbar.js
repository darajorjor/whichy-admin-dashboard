/* eslint-disable max-len */
import React, { Component, Fragment } from 'react'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
// import Drawer from 'material-ui/Drawer'
import SwipeableDrawer from 'material-ui/SwipeableDrawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import MenuIcon from 'material-ui-icons/Menu'
import Icon from 'material-ui/Icon'
import { withRouter, NavLink } from 'react-router-dom'
import { logout } from 'app/App.redux'
import isBrowser from 'app/helpers/isBrowser'

@withRouter
@withStyles({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})
@connect(
  state => ({
    token: state.Main.token,
  }),
  { logout },
)
@autobind
export default class Home extends Component {
  state = {
    left: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  handleLogOut() {
    /* eslint-disable no-shadow */
    const { logout, history } = this.props
    logout()
    history.push('/login')
  }

  render() {
    const { classes } = this.props
    const { token, history, title } = this.props

    return (
      <Fragment>
        <AppBar position="sticky">
          <Toolbar>
            {
              token &&
              <Button variant="title" color="inherit" onClick={this.toggleDrawer('left', true)}>
                <MenuIcon />
              </Button>
            }
            <Typography variant="title" color="inherit" className={classes.flex}>
              {isBrowser && title}
            </Typography>
            {
              token ?
                <Button variant="title" color="inherit" onClick={this.handleLogOut}>Logout</Button>
                :
                <Button variant="title" color="inherit" onClick={() => history.push('/login')}>Login</Button>
            }
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <div className={classes.list}>
              <List>
                <NavLink style={{ textDecoration: 'none' }} exact to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <Icon color="primary">home</Icon>
                    </ListItemIcon>
                    <ListItemText primary="HOME" />
                  </ListItem>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} exact to="/questions">
                  <ListItem button>
                    <ListItemIcon>
                      <Icon color="primary">mail</Icon>
                    </ListItemIcon>
                    <ListItemText primary="QUESTIONS" />
                  </ListItem>
                </NavLink>
              </List>
            </div>
          </div>
        </SwipeableDrawer>
      </Fragment>
    )
  }
}
