import Header from '@/components/layout/Header'
import LoginModal from '@/components/ui/modal/LoginModal'
export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <LoginModal />
    </>
  )
}
