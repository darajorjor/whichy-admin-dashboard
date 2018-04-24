import React from 'react'
import { withStyles } from 'material-ui/styles'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'


@withStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 170,
  },
}))
export default class ControlledOpenSelect extends React.Component {
  state = {
    // value: '',
    open: false,
  }

  handleChange = event => {
    const { onChange } = this.props

    onChange(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { classes, selectName, selectValue, items } = this.props

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="controlled-open-select">{selectName}</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={selectValue}
            onChange={this.handleChange}
            inputProps={{
              name: 'value',
              id: 'controlled-open-select',
            }}
          >
            {
              items.map(n => (
                <MenuItem
                  value={n.value}
                >
                  {n.displayName}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    )
  }
}
