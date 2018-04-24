const React = require('react')
const PropTypes = require('prop-types')

const isProd = process.env.NODE_ENV === 'production'

const Html = props => {
  const { assets, chunkNames } = props

  let { content } = props
  let scripts
  let preloadLinks

  if (isProd) {
    content = <div id='app' dangerouslySetInnerHTML={{ __html: content }} />

    const urls = [
      'manifest.js',
      'vendor.js',
      ...chunkNames,
      'main.js',
    ].map(name => assets[name])

    scripts = []
    preloadLinks = []

    urls.forEach(url => {
      scripts.push(<script src={url} />)
      preloadLinks.push(<link rel='preload' as='script' href={url} />)
    })
  } else {
    content = <div id='app' />
    scripts = <script src='/static/app.js' />
  }

  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#606c76' />
        <title>Whichy Panel</title>
        {isProd && preloadLinks}
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        {isProd && <link href={assets['main.css']} type='text/css' rel='stylesheet' />}
      </head>
      <body>
        {content}
        {scripts}
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  chunkNames: PropTypes.array,
  content: PropTypes.string,
}

module.exports = Html
