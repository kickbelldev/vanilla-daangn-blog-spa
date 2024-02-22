import { http, HttpResponse } from 'msw'
import { ARTICLE_LIST } from './data/articles'

export const handlers = [
  http.get('/api/user/:userId', ({ params }) => {
    const { userId } = params
    return HttpResponse.json({
      id: userId,
      firstName: 'John',
      age: 38,
    })
  }),
  http.get('/api/article', () => {
    return HttpResponse.json(ARTICLE_LIST)
  }),
  // http.all('*', () => {
  //   return HttpResponse.error()
  // }),
]
