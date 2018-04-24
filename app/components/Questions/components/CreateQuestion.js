import React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import api from 'app/helpers/ApiHOC'

@api({
  url: 'questions',
  method: 'POST',
  name: 'createQuestion',
})
export default class FormDialog extends React.Component {
  state = {
    open: false,

    whatif: null,
    but: null,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    const { data: { createQuestion } } = this.props
    const { whatif, but } = this.state

    createQuestion({
      body: {
        whatif,
        but,
      },
    })
      .then(() => this.handleClose())
  }

  handleChange = (fieldName) => (e) => {
    this.setState({
      [fieldName]: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleClickOpen}
          style={{
            display: 'block',
            margin: '10px auto',
          }}
        >
          پرسش جدید
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">پرسش جدید</DialogTitle>
          <DialogContent>
            <TextField
              value={this.state.whatif}
              onChange={this.handleChange('whatif')}
              autoFocus
              margin="dense"
              id="whatif"
              label="تصور کن اگه..."
              fullWidth
            />
            <TextField
              value={this.state.but}
              onChange={this.handleChange('but')}
              onSubmit={() => alert('fuck')}
              margin="dense"
              id="but"
              label="اما..."
              onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`)
                if (ev.key === 'Enter') {
                  this.handleSubmit()
                  ev.preventDefault()
                }
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              انصراف
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              ثبت
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}