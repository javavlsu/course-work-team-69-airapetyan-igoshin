import { IPost, Reaction } from '../../utils/globalTypes'

export type PublishPost = Omit<IPost, 'rating' | 'id' | 'blogName'>

export type UpdatedPost = PublishPost & { id: number }

export interface ReactionBody {
  postId: number
  reactionType: Reaction
}
