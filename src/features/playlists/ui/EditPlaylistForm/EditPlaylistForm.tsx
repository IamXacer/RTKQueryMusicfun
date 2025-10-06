import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import type {  UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
// import type { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form/dist/types/form'
import { useUpdatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'

type Props = {
  playlistId: string
  setPlaylistId:(playlistId: null) => void
  editPlaylist:(playlist:null) => void
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
  register: UseFormRegister<UpdatePlaylistArgs>;

}

export const EditPlaylistForm = ({playlistId,
                                   setPlaylistId,
                                   editPlaylist,
                                   handleSubmit,
                                   register,
                                 }:Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()
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