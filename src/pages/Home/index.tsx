import ArticleCard from '@/components/ArticleCard'
import { useAPI } from '@/hooks/useAPI'
import { Article } from '@/mocks/data/articles'

const Home = () => {
  const { data: articleData, isLoading } = useAPI<Article[]>('get', '/article')

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div class="article__list">
      {articleData.map((article) => {
        return <ArticleCard article={article} />
      })}
    </div>
  )
}

export default Home
