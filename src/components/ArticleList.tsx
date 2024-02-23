import { Article } from '@/mocks/data/articles'
import ArticleCard from './ArticleCard'
import { Component, DefaultProps } from '@/libs/jsx/jsx-runtime'

interface Props extends DefaultProps {
  articleList: Article[]
}

const ArticleList: Component<Props> = ({ articleList }) => {
  return (
    <div className="article__list">
      {articleList.map((article) => {
        return <ArticleCard article={article} />
      })}
    </div>
  )
}

export default ArticleList
