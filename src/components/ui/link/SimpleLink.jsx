import Link from "next/link"

const SimpleLink = ({ children, paddingX = 'px-4', paddingY = 'py-1', fontSize = 'text-lg', ...props }) => {
  return (
    <Link {...props} className={`${fontSize} rounded-md ${paddingY} ${paddingX} font-coolvetica text-blue-600 active:text-blue-800 hover:text-blue-700 duration-300`}>
      {children}
    </Link>
  )
}

export default SimpleLink