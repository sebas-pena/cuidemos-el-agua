import Link from "next/link"

const ButtonLink = ({ children, ...props }) => {
  return (
    <Link {...props} className="text-lg rounded-md py-1 px-4 text-white font-coolvetica bg-blue-600 active:bg-blue-800 hover:bg-blue-700 duration-300">
      {children}
    </Link>
  )
}

export default ButtonLink