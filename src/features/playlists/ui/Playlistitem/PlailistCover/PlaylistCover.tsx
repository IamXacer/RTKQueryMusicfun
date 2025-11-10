import s from './PlaylistCover.module.css'
import type { ChangeEvent } from 'react'
import defaultCover from '@/assets/images/NoCover.jfif'
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation
} from '@/features/playlists/api/playlistsApi.ts'
import type { Images } from '@/common/types'
import { toast } from 'react-toastify'

type Props = {
  playlistId: string,
  images:Images
}

export const PlaylistCover = ({playlistId,images}:Props) => {
  const [UploadPlaylistCover] = useUploadPlaylistCoverMutation()
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation()

  const original = images.main.find(img => img.type === 'original')
  const imgUrl =  original ? original.url : defaultCover

  const UploadPlaylistCoverHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
    const maxSize = 1024 * 1024
    const file = event.target.files?.length && event.target.files[0]
    if (!file) return
    if (!allowedTypes.includes(file.type)){
      console.log(`Invalid file type: ${file.type}`);  // Для отладки
      toast(`Only JPEG, PNG or GIF images are allowed`,{type:'error',theme:'colored'})
      return
    }
    if (file.size > maxSize) {
      console.log(`File too large: ${file.size} bytes`);  // Для отладки
      toast ( `The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`,{type:'error',theme:'colored'} )
      return
    }
    UploadPlaylistCover({
      playlistId,
      file,
    })
  }


  const deleteCoverHandler = () => {
    deletePlaylistCover({playlistId})
  }
  return (
    <>
      <img src={imgUrl} alt="Cover" width={'240'} className={s.cover} />
      <input type="file" accept={'image/jpeg,image/png,image/gif'} onChange={UploadPlaylistCoverHandler} />
      { original && <button onClick={deleteCoverHandler}>DeleteCover</button>}
    </>
  )
}