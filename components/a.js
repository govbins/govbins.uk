import Link from "next/link"
import React from "react"

const A = ({ href, children, target }) => {
  if (href.startsWith("/")) {
    return (
      <Link href={href}>
        <a className="underline">{children}</a>
      </Link>
    )
  } else {
    return (
      <a className="underline" href={href} target={target}>{children}</a>
    )
  }
}

export default A
