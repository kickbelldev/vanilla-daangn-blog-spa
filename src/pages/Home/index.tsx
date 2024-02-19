import ArticleCard from '@/components/ArticleCard'
import CategoryButton from '@/components/CartegoryButton'
import TopArticleCard from '@/components/TopArticleCard'
import { useAPI } from '@/hooks/useAPI'
import { Article, category, categoryMap } from '@/mocks/data/articles'

interface Props {
  pageParams?: string[]
}

const Home = ({ pageParams }: Props) => {
  const { data: articleData, isLoading } = useAPI<Article[]>('get', '/article')

  if (isLoading) {
    return <div></div>
  }

  const filteredData = articleData.filter((article) =>
    pageParams?.length ? article.category === pageParams[0] : true,
  )

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
        {filteredData.map((article) => {
          return <ArticleCard article={article} />
        })}
      </div>
    </div>
  )
}

export default Home
