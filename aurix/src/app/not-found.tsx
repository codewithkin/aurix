import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center flex flex-col gap-4 items-center justify-center">
        <article>
          <h1 className="text-6xl font-bold">Ooops, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 block">Nothing here</span></h1>
          <p className="text-xl text-slate-600">Sorry, the page you were looking for couldn't be found</p>
        </article>
        
        <Button className="bg-gradient-to-tr from-purple-600 to-blue-500 flex gap-2 hover:gap-4 w-fit transition duration-300" asChild variant="default">
          <Link href="/">
            <ArrowLeft size={20} />
            Back
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound

