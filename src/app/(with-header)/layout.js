import Header from '@/components/layout/Header'
export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
