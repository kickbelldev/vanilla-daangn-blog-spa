import _ from 'lodash'

import pathToRegex from '@/utils/pathToRegex'
import routes from '@/routes'
import { render } from './libs/valueToUI'

const router = () => {
  const { pathname } = location

  const resolvedRoutes = routes.map((route) => {
    const resolved = pathname.match(pathToRegex(route.path))
    return {
      ...route,
      resolved,
    }
  })

  const match = resolvedRoutes.find((route) => route.resolved)

  const $root = document.querySelector('#app') as HTMLElement

  if (!match?.resolved) {
    location.href = '/'
    return
  }

  const pageParams = _.toArray(match.resolved.slice(1))

  render($root, match.view, { pageParams })
}

export default router

// export default function () {}