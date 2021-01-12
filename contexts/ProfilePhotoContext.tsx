import { createContext, ReactNode } from 'react'

const profilePhoto = '/pods.svg' // create default value in context
// eslint-disable-next-line import/prefer-default-export
export const ProfilePhotoContext = createContext(profilePhoto) // create the context
const { Provider } = ProfilePhotoContext // <ProfilePhotoContext.Provider>
interface IProfilePhotoProvider {
    children: ReactNode
}
export const ProfilePhotoProvider = ({ children }: IProfilePhotoProvider) => (
  <Provider value={profilePhoto}>
    {children}
  </Provider>
)
