import { Article } from '@/mocks/data/articles'

interface Props {
  article: Article
}

const TopArticleCard = ({ article }: Props) => {
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
