/* eslint-disable @typescript-eslint/no-explicit-any */
import shallowEqual from '@/utils/shallowEquals'
import createDOM, { VirtualDOM, checkIsTextNode } from './createDOM'
import { Component } from '@/libs/jsx/jsx-runtime'

interface ValueObject {
  states: any[]
  stateIndex: number
  dependencies: any[][]
  depsIndex: number
}

interface RenderObject {
  root?: Component
  $parent?: HTMLElement
  pageParams?: string[]
  currentVDOM?: VirtualDOM
  futureVDOM?: VirtualDOM
}

function valueToUI() {
  const values: ValueObject = {
    states: [],
    stateIndex: 0,
    dependencies: [],
    depsIndex: 0,
  }

  const renderInfo: RenderObject = {}

  function _checkIsSameVDOM(current: VirtualDOM, future: VirtualDOM) {
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

    return true
  }

  function _update(
    $parent: ChildNode,
    oldNode?: VirtualDOM,
    newNode?: VirtualDOM,
    idx = 0,
  ) {
    if (!newNode) {
      if (oldNode) {
        $parent.removeChild($parent.childNodes[idx])
      }
    } else if (!oldNode) {
      $parent.appendChild(createDOM(newNode))
    } else if (oldNode && newNode && _checkIsSameVDOM(oldNode, newNode)) {
      $parent.replaceChild(createDOM(newNode), $parent.childNodes[idx])
    } else {
      if (!checkIsTextNode(newNode) && !checkIsTextNode(oldNode)) {
        const length = Math.max(
          newNode.children?.length ?? 0,
          oldNode.children?.length ?? 0,
        )

        for (let i = 0; i < length; i++) {
          _update(
            $parent.childNodes[idx],
            oldNode.children?.[i],
            newNode.children?.[i],
            i,
          )
        }
      }
    }
  }

  function _render() {
    try {
      renderInfo.futureVDOM = renderInfo.root?.({
        pageParams: renderInfo.pageParams,
      })
      _update(
        renderInfo.$parent as ChildNode,
        renderInfo.currentVDOM,
        renderInfo.futureVDOM,
      )
      values.stateIndex = 0
      values.depsIndex = 0
    } finally {
      renderInfo.currentVDOM = renderInfo.futureVDOM
    }
  }

  function render(
    rootElement: HTMLElement,
    component: Component,
    { pageParams }: { pageParams: string[] },
  ) {
    renderInfo.$parent = rootElement
    renderInfo.root = component
    renderInfo.pageParams = pageParams
    _render()
  }

  function useState<T>(initialState: T) {
    const index = values.stateIndex

    if (typeof values.states[index] === 'undefined') {
      values.states[index] = initialState
    }

    const state = values.states[index]

    function setState(newValue: T) {
      if (shallowEqual(state, newValue)) {
        return
      }

      values.states[index] = newValue
      _render()
    }

    values.stateIndex += 1

    return [state, setState]
  }

  function useEffect(callback: () => void, dependencies: any[]) {
    const index = values.depsIndex

    const oldDependencies = values.dependencies[index]

    let hasChanged = true

    if (oldDependencies) {
      hasChanged = dependencies.some((val, idx) => {
        return !shallowEqual(val, oldDependencies[idx])
      })
    }

    if (hasChanged) {
      callback()
      values.dependencies[index] = dependencies
    }

    values.depsIndex += 1
  }

  return { render, useState, useEffect }
}

export const { render, useState, useEffect } = valueToUI()
