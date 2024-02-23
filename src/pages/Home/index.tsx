import ArticleList from '@/components/ArticleList'
import CategoryButton from '@/components/CartegoryButton'
import TopArticleCard from '@/components/TopArticleCard'
import { useAPI } from '@/hooks/useAPI'
import { Component } from '@/libs/jsx/jsx-runtime'
import { PageProps } from '@/libs/vtu/valueToUI'
import { Article, category, categoryMap } from '@/mocks/data/articles'

const Home: Component = ({ pageParams }: PageProps) => {
  const { data: articleData } = useAPI<Article[]>('get', '/article')

  if (articleData == null) {
    return <div></div>
  }

  const filteredData = articleData.filter((article) =>
    pageParams?.length ? article.category === pageParams[0] : true,
  )

  return (
    <div className="layout">
      <TopArticleCard article={articleData[0]} />
      <div className="article__category">
        <a
          data-link
          href="/"
          className={`category-link${
            location.pathname === '/' ? ' active' : ''
          }`}
        >
          전체
        </a>
        {Object.entries(categoryMap).map((cat) => (
          <CategoryButton category={cat as [category, string]} />
        ))}
      </div>
      <ArticleList articleList={filteredData} />
    </div>
  )
}

export default Home
