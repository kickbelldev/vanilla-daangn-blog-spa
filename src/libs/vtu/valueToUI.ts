/* eslint-disable @typescript-eslint/no-explicit-any */
import shallowEqual from '@/utils/shallowEquals'
import { VirtualDOM } from './createDOM'
import { Component, DefaultProps } from '@/libs/jsx/jsx-runtime'
import { DOMUpdate } from './DOMUtils'

interface ValueObject {
  states: any[]
  stateIndex: number
  dependencies: any[][]
  depsIndex: number
}

export interface PageProps extends DefaultProps {
  pageParams?: string[]
}

interface RenderObject {
  root?: Component<PageProps>
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

  function _render() {
    renderInfo.futureVDOM = renderInfo.root?.({
      pageParams: renderInfo.pageParams,
    })
    DOMUpdate(
      renderInfo.$parent as ChildNode,
      renderInfo.currentVDOM,
      renderInfo.futureVDOM,
    )
    values.stateIndex = 0
    values.depsIndex = 0
    renderInfo.currentVDOM = renderInfo.futureVDOM
  }

  function render(
    rootElement: HTMLElement,
    component: Component<PageProps>,
    { pageParams }: { pageParams: string[] },
  ) {
    if (renderInfo.$parent === rootElement && renderInfo.root === component) {
      renderInfo.pageParams = pageParams
      _render()
      return
    }
    renderInfo.$parent = rootElement
    renderInfo.root = component
    renderInfo.pageParams = pageParams
    values.states = []
    values.dependencies = []
    _render()
  }

  function useState<T>(initialState?: T) {
    const index = values.stateIndex

    if (typeof values.states[index] === 'undefined') {
      values.states[index] = initialState
    }
    const state = values.states[index] as T

    function setState(newState: T) {
      if (shallowEqual(state, newState)) {
        return
      }

      values.states[index] = newState
      _render()
    }

    values.stateIndex += 1

    return [state, setState] as [T, (newState: T) => void]
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
      values.dependencies[index] = dependencies
      callback()
    }

    values.depsIndex += 1
  }

  return { render, useState, useEffect }
}

export const { render, useState, useEffect } = valueToUI()