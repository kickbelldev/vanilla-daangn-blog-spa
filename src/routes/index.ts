import { Component } from '@/libs/jsx/jsx-runtime'
import Home from '@/pages/Home'
import Post from '@/pages/Post'

interface Route {
  path: string
  view: Component
  resolved?: RegExpMatchArray
}

const routes: Route[] = [
  { path: '/', view: Home as Component },
  { path: '/category/:category', view: Home as Component },
  { path: '/post/:id', view: Post as Component },
  // { path: '/edit/:id', view: Write as typeof Component, resolved: null },
  // { path: '/write', view: Write as typeof Component, resolved: null },
]

export default routes
