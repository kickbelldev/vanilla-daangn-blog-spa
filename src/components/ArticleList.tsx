import { Article } from '@/mocks/data/articles'
import ArticleCard from './ArticleCard'

interface Props {
  articleList: Article[]
}

const ArticleList = ({ articleList }: Props) => {
  return (
    <div class="article__list">
      {articleList.map((article) => {
        return <ArticleCard article={article} />
      })}
    </div>
  )
}

export default ArticleList
