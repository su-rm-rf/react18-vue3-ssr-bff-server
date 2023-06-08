import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

import App from '@/App'
import { store } from '@/store'

export default (req, res) => {
  const { pipe } = renderToPipeableStream(
    <Provider store={ store }>
      <StaticRouter location={ req.url }>
        <App />
      </StaticRouter>
    </Provider>
  , {
    bootstrapScripts: ['/client.bundle.js'],
    onShellReady() {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
          <title>ssr</title>
          <script>
            var domEl = document.documentElement, domElWidth = domEl.clientWidth
            domEl.style.fontSize = domElWidth / 7.5 + 'px'
          </script>
          <link rel="shortcut icon" type="images/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/main.css" />
        </head>
        <body>
        <div id="root">`)
      pipe(res)
      res.write(`</div>
        </body>
        </html>`)
    },
  })
}