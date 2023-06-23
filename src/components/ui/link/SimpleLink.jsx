import Link from "next/link"

const SimpleLink = ({ children, ...props }) => {
  return (
    <Link {...props} className="text-lg rounded-md py-1 px-4 font-coolvetica text-blue-600 active:text-blue-800 hover:text-blue-700 duration-300">
      {children}
    </Link>
  )
}

export default SimpleLink