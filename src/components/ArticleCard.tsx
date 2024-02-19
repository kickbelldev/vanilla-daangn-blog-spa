import { Article, categoryMap } from '@/mocks/data/articles'

interface Props {
  article: Article
}

const ArticleCard = ({ article }: Props) => {
  return (
    <div class="article__card">
      <a href={`/article/${article.id}`} class="wrapper">
        <div class="thumbnail">
          <img src={article.thumbnail} />
        </div>
        <h3 class="title">{article.title}</h3>
        <p class="description">{article.description}</p>
      </a>
      <a href={`/category/${article.category}`} class="category-link">
        {categoryMap[article.category]}
      </a>
    </div>
  )
}

export default ArticleCard
