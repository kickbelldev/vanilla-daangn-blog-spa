/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */
declare global {
  module JSX {
    type IntrinsicElements = {
      [elemName in keyof HTMLElementTagNameMap]: Record<string, any>
    }
  }
}

export type Component = (props?: Record<string, any>) => any

export const jsx = {
  component(
    component: string | Component,
    props: Record<string, any> | null,
    ...children: any[]
  ) {
    if (typeof component === 'function') {
      return component({ ...props, children })
    }

    return {
      tag: component,
      props,
      children: children,
    }
  },
}
