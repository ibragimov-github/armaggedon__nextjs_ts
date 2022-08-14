declare module '*.svg' {
  import React from 'react'
  const Component: React.FunctionComponent<React.SVG<SVGSVGElement>>
  export default Component
}