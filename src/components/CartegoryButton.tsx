import { category } from '@/mocks/data/articles'

interface Props {
  category: [category, string]
}

const CategoryButton = ({ category: [key, label] }: Props) => {
  return (
    <a
      href={`/category/${key}`}
      class={`category-link${
        location.pathname === `/category/${key}` ? ' active' : ''
      }`}
    >
      {label}
    </a>
  )
}

export default CategoryButton
