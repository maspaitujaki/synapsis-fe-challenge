import Link from "next/link";


export default function BlogPagination({currPage}: {currPage: string}){
  const pageNumber = isNaN(currPage as any) ? 1: parseInt(currPage);
  let linkEl = (
    <Link href={`/blogs/${pageNumber-1}`} className="shadow flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
      <span className="sr-only">Previous</span>
      <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
      </svg>
    </Link>)
  if (pageNumber === 1) {
    linkEl = (
    <Link 
      href='/link' 
      className={'pointer-events-none opacity-50 shadow flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700'} 
      aria-disabled={true} 
      tabIndex={-1}
    >
      <span className="sr-only">Previous</span>
      <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
      </svg>
    </Link>
    )
  }
  return (
    <>
    <nav >
      <ul className="flex items-center space-x-px h-8 text-sm">
        <li>
          {linkEl}
        </li>
        <li>
          <Link href={`/blogs/${pageNumber+1}`} className="shadow flex items-center justify-center px-3 h-8  ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
    </>
  )
}