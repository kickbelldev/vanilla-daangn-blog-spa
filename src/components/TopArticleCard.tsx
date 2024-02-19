import { Article } from '@/mocks/data/articles'

interface Props {
  article: Article
}

const TopArticleCard = ({ article }: Props) => {
  return (
    <div class="top__article__card">
      <a href={`/article/${article.id}`} class="wrapper">
        <div class="thumbnail">
          <img src={article.thumbnail} />
        </div>
        <div class="text">
          <h1 class="title">{article.title}</h1>
          <p class="description">{article.description}</p>
        </div>
      </a>
    </div>
  )
}

export default TopArticleCard
