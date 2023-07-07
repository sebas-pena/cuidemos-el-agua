import AdminNavBar from "@/components/layout/AdminNavBar"

const layout = ({ children }) => {
  return (
    <main className='mx-auto max-w-4xl w-full'>
      <AdminNavBar />
      {children}
    </main>
  )
}

export default layout