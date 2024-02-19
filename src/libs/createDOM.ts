/* eslint-disable @typescript-eslint/no-explicit-any */

export interface VirtualDOMNode {
  tag: string
  props?: Record<string, any>
  children?: VirtualDOM[]
}

type TextNode = string | number | Array<any>
export type VirtualDOM = VirtualDOMNode | TextNode

export const checkIsTextNode = (element: VirtualDOM): element is TextNode => {
  if (Array.isArray(element)) {
    return true
  }

  if (typeof element === 'string' || typeof element === 'number') {
    return true
  }

  return false
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
