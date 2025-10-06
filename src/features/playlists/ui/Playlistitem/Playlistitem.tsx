import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types.ts'
import { PlaylistCover } from '@/features/playlists/ui/Playlistitem/PlailistCover/PlaylistCover.tsx'
import { PlaylistDescription } from '@/features/playlists/ui/Playlistitem/PlaylistDescription/PlaylistDescription.tsx'

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
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images}/>
      <PlaylistDescription attributes={playlist.attributes}/>
      <button onClick={() => DeletePlaylistHandler(playlist.id)}>Delete</button>
      <button onClick={() => editPlaylistHandler(playlist)}>Update</button>
    </div>
  )
}