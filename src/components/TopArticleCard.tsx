import { Component, DefaultProps } from '@/libs/jsx/jsx-runtime'
import { Article } from '@/mocks/data/articles'

interface Props extends DefaultProps {
  article: Article
}

const TopArticleCard: Component<Props> = ({ article }) => {
  return (
    <div className="top__article__card">
      <a href={`/article/${article.id}`} className="wrapper">
        <div className="thumbnail">
          <img src={article.thumbnail} />
        </div>
        <div className="text">
          <h1 className="title">{article.title}</h1>
          <p className="description">{article.description}</p>
        </div>
      </a>
    </div>
  )
}

export default TopArticleCard
