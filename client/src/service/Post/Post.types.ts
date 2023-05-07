import { IPost } from '../../utils/globalTypes'

export type PublishPost = Omit<IPost, 'rating' | 'id' | 'blogName'>

export type UpdatedPost = PublishPost & { id: number }
