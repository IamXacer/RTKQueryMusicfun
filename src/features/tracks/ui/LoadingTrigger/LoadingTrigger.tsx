import type { RefObject } from 'react'

type Props = {
  observerRef: RefObject<HTMLDivElement | null>
  isFetching: boolean
}
export const LoadingTrigger = ({observerRef,isFetching}:Props) => {
  return (
    <div ref={observerRef}>
      {isFetching ? <div>Loading...</div> : <div style={{ height: '20px' }}></div>}
    </div>
  )
}