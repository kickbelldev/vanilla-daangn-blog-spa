import { Component } from '@/libs/jsx/jsx-runtime'
import { DefaultProps } from '@/libs/vtu/types'
import { category } from '@/mocks/data/articles'

interface Props extends DefaultProps {
  category: [category, string]
}

const CategoryButton: Component<Props> = ({ category: [key, label] }) => {
  return (
    <a
      data-link
      href={`/category/${key}`}
      className={`category-link${
        location.pathname === `/category/${key}` ? ' active' : ''
      }`}
    >
      {label}
    </a>
  )
}

export default CategoryButton
