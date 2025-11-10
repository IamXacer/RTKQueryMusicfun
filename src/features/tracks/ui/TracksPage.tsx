import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi.ts'
import s from './TracksPage.module.css'
import { useInfiniteScroll } from '@/common/hooks'
import { TracksList } from '@/features/tracks/ui/TracksList/TracksList.tsx'
import { LoadingTrigger } from '@/features/tracks/ui/LoadingTrigger/LoadingTrigger.tsx'

export const TracksPage = () => {
  // Получаем данные и состояния из хука
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchTracksInfiniteQuery()

  // Логика для использования infinite scroll
  const { observerRef } = useInfiniteScroll({ hasNextPage, fetchNextPage, isFetching })

  // Собираем все треки из всех страниц
  const pages = data?.pages.flatMap((page) => page.data) || []

  return (
    <div>
      <h1>Tracks page</h1>
      <div className={s.list}>
        <TracksList tracks={pages} />  {/* Отображаем список треков */}

        {/* Индикатор загрузки, если есть следующая страница */}
        {hasNextPage && (
          <LoadingTrigger isFetching={isFetching} observerRef={observerRef} />
        )}

        {/* Сообщение, если больше нет данных для загрузки */}
        {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
      </div>
    </div>
  )
}
