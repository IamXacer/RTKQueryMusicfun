import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types.ts'

type Props = {
  playlist:PlaylistData
  DeletePlaylistHandler:(playlistId:string) => void,
  editPlaylistHandler:(playlist:PlaylistData) => void,
}
export const PlaylistItem = ({playlist,
                               editPlaylistHandler,
                               DeletePlaylistHandler,

                             }:Props) => {
  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={()=> DeletePlaylistHandler(playlist.id)}>Delete</button>
      <button onClick={()=> editPlaylistHandler(playlist)}>Update</button>
    </div>
  )
}