import Link from 'next/link'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen flex flex-col gap-8 items-center justify-center">
      <Link href="/" className="font-mono font-bold text-lg">
        /wazzaapp!
      </Link>
      {children}
    </section>
  )
}