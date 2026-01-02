import type { PlaylistAttributes } from '@/features/playlists/api/playlistsApi.types.ts'
import s from './PlaylistDescription.module.css'

type Props = {
  attributes:PlaylistAttributes,
}
export const PlaylistDescription = ({attributes}:Props) => {
  return(
    <>
      <div className={s.truncate}>title: {attributes.title}</div>
      <div className={s.truncate}>description: {attributes.description}</div>
      <div>userName: {attributes.user.name}</div>
    </>
  )
}