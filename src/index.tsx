import { worker } from './mocks/browser'
import route, { Router } from '@/libs/router'

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const $a = (e.target as HTMLElement).closest('a')
    if ($a?.matches('[data-link]')) {
      e.preventDefault()
      Router.push($a.href)
    }
  })

  window.addEventListener('popstate', route)

  if (process.env.NODE_ENV === 'development') {
    worker.start({ onUnhandledRequest: 'bypass' }).then(() => route())
  } else {
    route()
  }
})
