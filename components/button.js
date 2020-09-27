import Link from "next/link";
import React from "react";

const Button = ({ href, children }) => {
  return (
    <Link href={href}>
      <a style={{ background: '#333' }} className="text-xl mt-4 text-white rounded-md p-4 inline-block">
        {children}
      </a>
    </Link>
  )
}

export default Button;
