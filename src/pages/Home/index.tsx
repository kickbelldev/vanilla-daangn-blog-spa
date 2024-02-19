import ArticleCard from '@/components/ArticleCard'
import TopArticleCard from '@/components/TopArticleCard'
import { useAPI } from '@/hooks/useAPI'
import { Article, categoryMap } from '@/mocks/data/articles'

const Home = () => {
  const { data: articleData, isLoading } = useAPI<Article[]>('get', '/article')

  if (isLoading) {
    return <div>loading...</div>
  }

  console.log(location.pathname)

  return (
    <div class="layout">
      <TopArticleCard article={articleData[0]} />
      <div class="article__category">
        <a
          href="/"
          class={`category-link${location.pathname === '/' ? ' active' : ''}`}
        >
          전체
        </a>
        {Object.entries(categoryMap).map(([key, label]) => (
          <a
            href={`/category/${key}`}
            class={`category-link${
              location.pathname === `/category/${key}` ? ' active' : ''
            }`}
          >
            {label}
          </a>
        ))}
      </div>
      <div class="article__list">
        {articleData.map((article) => {
          return <ArticleCard article={article} />
        })}
      </div>
    </div>
  )
}

export default Home
