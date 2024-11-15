import AuthCheck from '@/components/AuthCheck'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthCheck>{children}</AuthCheck>
} 