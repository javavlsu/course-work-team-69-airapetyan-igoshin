import { IPost } from '../../utils/globalTypes'

export type PublishPost = Omit<IPost, 'rating' | 'id'>

export type UpdatedPost = PublishPost & { id: number }
