import type { SubmitHandler } from 'react-hook-form'
import type {  UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'

type Props = {
  playlistId: string
  setPlaylistId:(playlistId: null) => void
  editPlaylist:(playlist:null) => void
}

export const EditPlaylistForm = ({playlistId,setPlaylistId,editPlaylist}:Props) => {

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = body => {
    if (!playlistId ) return
    updatePlaylist({ playlistId, body: body }).then(() => {
      setPlaylistId(null)
    })

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
    )


}