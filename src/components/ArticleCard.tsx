import { Component } from '@/libs/jsx/jsx-runtime'
import { DefaultProps } from '@/libs/vtu/types'
import { Article, categoryMap } from '@/mocks/data/articles'

interface Props extends DefaultProps {
  article: Article
}

const ArticleCard: Component<Props> = ({ article }) => {
  return (
    <div className="article__card">
      <a data-link href={`/article/${article.id}`} className="wrapper">
        <div className="thumbnail">
          <img src={article.thumbnail} />
        </div>
        <h3 className="title">{article.title}</h3>
        <p className="description">{article.description}</p>
      </a>
      <a
        data-link
        href={`/category/${article.category}`}
        className="category-link"
      >
        {categoryMap[article.category]}
      </a>
    </div>
  )
}

export default ArticleCard
