import { http, HttpResponse } from 'msw'
import { ARTICLE_DETAIL, ARTICLE_LIST } from './data/articles'

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
  http.get('/api/article/:id', ({ params }) => {
    const { id } = params
    const article = ARTICLE_DETAIL.find((article) => article.id === Number(id))
    return HttpResponse.json(article)
  }),
  // http.all('*', () => {
  //   return HttpResponse.error()
  // }),
]
