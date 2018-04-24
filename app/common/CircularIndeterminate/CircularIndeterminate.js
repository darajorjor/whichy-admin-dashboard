import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = () => ({
  progress: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
})

function CircularIndeterminate(props) {
  const { classes } = props
  return (
    <div>
      <CircularProgress className={classes.progress} />
    </div>
  )
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(CircularIndeterminate)
