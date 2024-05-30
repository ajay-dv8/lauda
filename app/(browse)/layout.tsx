import React, { Suspense } from 'react'
import { Navbar } from './_components/navbar'
import { Sidebar, SideBarSkeleton } from './_components/sidebar'
import { Container } from './_components/container'

const BrowseLayout = ({
  children,
} : {
  children: React.ReactNode
}) => {

  return (
    <>
    <Navbar/>

    <div className='flex w-full pt-20'>
      <Suspense fallback= { <SideBarSkeleton /> }>
        <Sidebar/>
      </Suspense>

      <Container>
        { children }
      </Container>
    </div>
    </>
  )
}

export default BrowseLayout