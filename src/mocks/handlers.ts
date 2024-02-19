import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user/:userId', ({ params }) => {
    const { userId } = params
    return HttpResponse.json({
      id: userId,
      firstName: 'John',
      age: 38,
    })
  }),
  http.all('*', () => {
    return HttpResponse.error()
  }),
]
