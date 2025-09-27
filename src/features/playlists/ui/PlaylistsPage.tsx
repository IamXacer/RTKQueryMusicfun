import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
  useUpdatePlaylistMutation
} from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx'
import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { PlaylistItem } from '@/features/playlists/ui/Playlistitem/Playlistitem.tsx'
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx'


export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()
  const { data } = useFetchPlaylistsQuery()
  const [DeleteHandler] = useDeletePlaylistMutation()
  const [updatePlaylist] = useUpdatePlaylistMutation()

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

  // 4

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm/>
      <div className={s.items}>
        {data?.data.map((playlist) => {

          const isEditing = playlist.id === playlistId


          return (
            <div className={s.item} key={playlist.id}>

              {
                isEditing ?
        /*          <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Edit playlist</h2>
                    <div>
                      <input {...register('title')} placeholder={'title'} />
                    </div>
                    <div>
                      <input {...register('description')} placeholder={'description'} />
                    </div>
                    <button type={'submit'}>save</button>
                    <button type={'button'} onClick={() => editPlaylistHandler(null)}>
                      cancel
                    </button>
                  </form>*/
                  <EditPlaylistForm playlistId={playlistId} setPlaylistId={setPlaylistId} editPlaylist={editPlaylistHandler}/>
                  :
                  <PlaylistItem playlist={playlist}
                                editPlaylistHandler={editPlaylistHandler}
                                DeletePlaylistHandler={DeletePlaylistHandler}/>
          /*        <div>
                    <div>title: {playlist.attributes.title}</div>
                    <div>description: {playlist.attributes.description}</div>
                    <div>userName: {playlist.attributes.user.name}</div>
                    <button onClick={()=> DeletePlaylistHandler(playlist.id)}>Delete</button>
                    <button onClick={()=> editPlaylistHandler(playlist)}>Update</button>
                  </div>*/
              }

            </div>

          )
        })}
      </div>
    </div>
  )
}
