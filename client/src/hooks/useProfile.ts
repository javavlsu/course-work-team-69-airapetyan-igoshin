import { useEffect, useState } from 'react'
import User from '../domain/User'
import { IProfile } from '../service/user'

export const useProfile = () => {
  const [profile, setProfile] = useState<IProfile>()
  const profileRequest = async () =>
    await User.getProfile().then((data) => setProfile(data))

  useEffect(() => {
    profileRequest()
  }, [])
  return { profile }
}
