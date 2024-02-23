import ArticleList from '@/components/ArticleList'
import { useAPI } from '@/hooks/useAPI'
import { Component } from '@/libs/jsx/jsx-runtime'
import { PageProps } from '@/libs/vtu/valueToUI'
import { ARTICLE_LIST, ArticleDetail, categoryMap } from '@/mocks/data/articles'

const Article: Component<PageProps> = ({ pageParams }) => {
  const { data } = useAPI<ArticleDetail>('get', `/article/${pageParams}`)

  if (!data) {
    return <div></div>
  }

  return (
    <div className="layout">
      {data && (
        <div className="article__container">
          <div className="title-section">
            <h1 className="title">{data.title}</h1>
            <p className="information">
              {categoryMap[data.category]} | {data.date}
            </p>
          </div>
          <div className="thumbnail">
            <img src={data.thumbnail} alt={data.title} />
          </div>
          <section className="main">
            <div className="body" innerHTML={data.contents} />
            <div className="author">
              <div className="thumbnail">
                <img src={data.author.thumbnail} alt={data.author.name} />
              </div>
              <div className="info">
                <h3>{data.author.name}</h3>
                <p>{data.author.description}</p>
              </div>
            </div>
            <ul className="tag-list">
              {data.tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
      <div className="back-button">
        <a data-link href="/">
          블로그 홈
        </a>
      </div>
      <div className="related-articles">
        <h3>추천 포스트</h3>
        <div className="list">
          <ArticleList articleList={ARTICLE_LIST.slice(0, 2)} />
        </div>
      </div>
    </div>
  )
}

export default Article
