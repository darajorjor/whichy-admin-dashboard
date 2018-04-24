import React from 'react'
import getLoadingComponent from 'helpers/get-loading-component'
import Spinner from './Spinner'

// Just make the `Loading` component here
// and export it, it will be picked by the
// `../routes/async` module and shown while
// a module is being loaded.
// For docs, see `../helpers/get-loading-component`.
const Loading = getLoadingComponent({
  LoadingComponent: () => <Spinner />,
  TimeoutComponent: () => <div>Taking a loooong time...</div>,
  ErrorComponent: () =>
    <div style={{ color: 'red' }}>Something went wrong ¯\_(ツ)_/¯</div>,
})

export default Loading
