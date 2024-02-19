import shallowEqual from '@/utils/shallowEquals'
import createDOM, { VirtualDOM, checkIsTextNode } from './createDOM'

function checkIsSameVDOM(current: VirtualDOM, future: VirtualDOM) {
  if (checkIsTextNode(current)) {
    if (checkIsTextNode(future)) {
      return current === future
    }

    return false
  }

  if (checkIsTextNode(future)) {
    return false
  }

  if (current.tag !== future.tag) {
    return false
  }

  if (!shallowEqual(current.props, future.props)) {
    return false
  }

  return true
}
export function DOMUpdate(
  $parent: ChildNode,
  oldNode?: VirtualDOM,
  newNode?: VirtualDOM,
  idx = 0,
) {
  if (newNode == null) {
    if (oldNode != null) {
      $parent.removeChild($parent.childNodes[idx])
      return idx
    }
  } else if (oldNode == null) {
    $parent.appendChild(createDOM(newNode))
  } else if (
    oldNode != null &&
    newNode != null &&
    !checkIsSameVDOM(oldNode, newNode)
  ) {
    $parent.replaceChild(createDOM(newNode), $parent.childNodes[idx])
  } else if (!checkIsTextNode(newNode) && !checkIsTextNode(oldNode)) {
    const length = Math.max(
      newNode.children?.length ?? 0,
      oldNode.children?.length ?? 0,
    )
    for (let i = 0; i < length; i++) {
      const result = DOMUpdate(
        $parent?.childNodes[idx],
        oldNode.children?.[i],
        newNode.children?.[i],
        i,
      )
      if (typeof result === 'number') {
        oldNode.children?.splice(result, 1)
        newNode.children?.splice(result, 1)
        i = result - 1
      }
    }
  }
}
