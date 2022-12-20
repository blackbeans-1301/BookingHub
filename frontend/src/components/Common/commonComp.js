import * as React from "react"

export function PrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        left: "60px"
      }}
      onClick={onClick}
    />
  )
}

export function NextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        left: "50px"
      }}
      onClick={onClick}
    />
  )
}