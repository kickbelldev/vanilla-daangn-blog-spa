/* eslint-disable @typescript-eslint/no-explicit-any */

export interface VirtualDOMNode {
  tag: string
  props?: any
  children?: VirtualDOM[]
}

type TextNode = string | number
export type VirtualDOM = VirtualDOMNode | TextNode

export const checkIsTextNode = (
  element: VirtualDOMNode | TextNode,
): element is TextNode => {
  if (typeof element === 'object' && element.tag) {
    return false
  }

  return true
}

const createDOM = (node: VirtualDOM): HTMLElement | Text => {
  if (checkIsTextNode(node)) {
    return document.createTextNode(node.toString())
  }

  const element = document.createElement(node.tag)

  if (node.props) {
    for (const key in node.props) {
      ;(element as any)[key] = node.props[key]
    }
  }

  node.children?.forEach((child) => {
    element.append(createDOM(child))
  })

  return element
}

export default createDOM
