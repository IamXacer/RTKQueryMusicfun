import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx'
import { PlaylistItem } from '@/features/playlists/ui/Playlistitem/Playlistitem.tsx'
import {  useState } from 'react'
import s from './PlaylistsList.module.css'

import { useForm } from 'react-hook-form'
import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { useDeletePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'

type Props = {
  playlists: PlaylistData[]
  isPlaylistsLoading: boolean
}

export const PlaylistsList = ({playlists,isPlaylistsLoading}:Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()
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
  return (
    <div className={s.items}>
      {/* Если нет данных и не идет загрузка, показываем сообщение */}
      {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}

      {/* Перебираем переданные плейлисты и отображаем их */}
      {playlists.map((playlist) => {
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
  )
}