import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,

} from '@/features/playlists/api/playlistsApi.ts'
import s from './Playlistitem/PlailistCover/PlaylistCover.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx'
import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { PlaylistItem } from '@/features/playlists/ui/Playlistitem/Playlistitem.tsx'
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx'
import { useDebounceValue } from '@/common/hooks'
import { Pagination } from '@/common/components'


export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)


  const debounceSearch = useDebounceValue(search)
  const { data, isLoading } = useFetchPlaylistsQuery({search:debounceSearch,pageNumber:currentPage,pageSize})


  const [DeleteHandler] = useDeletePlaylistMutation()


  const DeletePlaylistHandler = (playlistId:string) => {
    if (confirm('Are you sure you want to delete this playlist?')) {
    DeleteHandler(playlistId)
  }}

 const editPlaylistHandler = (playlist:PlaylistData | null) => {
   if (playlist) {
     setPlaylistId(playlist.id)
     reset({
       title:playlist.attributes.title,
       description:playlist.attributes.description,
       tagIds:playlist.attributes.tags.map(tag => tag.id),
     })
   }else {
     setPlaylistId(null)
   }
 }

 const changePageSizeHandler = (size:number) => {
   setCurrentPage(1)
    setPageSize(size)
 }
  // 4

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm/>

      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}
      <div className={s.items}>
        {data?.data.map((playlist) => {

          const isEditing = playlist.id === playlistId


          return (
            <div className={s.item} key={playlist.id}>

              {
                isEditing ?

                  <EditPlaylistForm
                    playlistId={playlistId}
                    setPlaylistId={setPlaylistId}
                    editPlaylist={editPlaylistHandler}
                    handleSubmit={handleSubmit}
                    register={register}
                  />
                  :
                  <PlaylistItem playlist={playlist}
                                editPlaylistHandler={editPlaylistHandler}
                                DeletePlaylistHandler={DeletePlaylistHandler}/>
              }

            </div>

          )
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize = {pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
