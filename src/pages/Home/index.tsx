import ArticleCard from '@/components/ArticleCard'
import CategoryButton from '@/components/CartegoryButton'
import TopArticleCard from '@/components/TopArticleCard'
import { useAPI } from '@/hooks/useAPI'
import { Article, category, categoryMap } from '@/mocks/data/articles'

const Home = () => {
  const { data: articleData, isLoading } = useAPI<Article[]>('get', '/article')

  if (isLoading) {
    return <div></div>
  }

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
        {Object.entries(categoryMap).map((cat) => (
          <CategoryButton category={cat as [category, string]} />
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
