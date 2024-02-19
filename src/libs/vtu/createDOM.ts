/* eslint-disable @typescript-eslint/no-explicit-any */

export interface VirtualDOMNode {
  tag: keyof HTMLElementTagNameMap
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

  if (!element.tag) {
    return true
  }

  return false
}

const createDOM = (node: VirtualDOM): HTMLElement | Text => {
  if (checkIsTextNode(node)) {
    if (typeof node === 'object') {
      return document.createTextNode(JSON.stringify(node))
    }
    return document.createTextNode(node.toString())
  }

  const element = document.createElement(node.tag)

  if (node.props) {
    for (const key in node.props) {
      if (key === 'class') {
        element.className = node.props[key]
      } else {
        ;(element as any)[key] = node.props[key]
      }
    }
  }

  node.children?.forEach((child) => {
    element.append(createDOM(child))
  })

  return element
}

export default createDOM
