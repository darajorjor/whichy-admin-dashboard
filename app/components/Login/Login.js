import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import Navbar from 'components/Navbar'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import api from 'app/helpers/ApiHOC'
import { connect } from 'react-redux'
import { setAuthentication } from 'app/App.redux'

@api({
  url: 'login',
  method: 'POST',
  name: 'login',
})
@connect(
  null,
  { setAuthentication },
)
@withStyles(theme => ({
  wrapper: {
    height: '100vh',
    ...theme.alignment.centered,
    paddingBottom: theme.spacing.unit * 4,
  },
  paper: {
    position: 'relative',
    width: '30vw',
    height: '30vw',
    minWidth: '300px',
    minHeight: '300px',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit * 4,
  },
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
  },
}))
export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  onSubmit = () => {
    /* eslint-disable */
    const { data: { login }, history, setAuthentication } = this.props
    const {
      username,
      password,
    } = this.state

    login({
      body: {
        username,
        password,
      },
    })
      .then(({ token }) => {
        setAuthentication(token)
        setTimeout(() => history.push('/'), 500)
      })
  }

  render() {
    const { classes } = this.props
    const {
      username,
      password,
    } = this.state

    return (
      <Fragment>
        <Navbar title='LOGIN' />
        <div className={classes.wrapper}>
          <Paper className={classes.paper}>
            <Typography variant='title'>Login</Typography>
            <TextField
              id="name"
              label="Username"
              value={username}
              onChange={this.handleChange('username')}
              margin='normal'
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={password}
                onChange={this.handleChange('password')}
                margin='normal'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => this.setState(prevState => ({ showPassword: !prevState.showPassword }))}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              variant='raised'
              color='primary'
              className={classes.button}
              disabled={!username || !password}
              onClick={this.onSubmit}
            >
              Login
            </Button>
          </Paper>
        </div>
      </Fragment>
    )
  }
}
