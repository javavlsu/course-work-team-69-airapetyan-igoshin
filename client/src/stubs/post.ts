import { Blog_1_Post_1, Blog_1_Post_2, Blog_1_Post_3 } from '../assets'
import { IPreviewPost } from '../utils/globalTypes.js'

export const stubPosts: IPreviewPost[] = [
  {
    id: 1,
    title: 'Заголовок',
    description: 'asdsd',
    rating: 100
  },
  {
    id: 2,
    title: 'Заголовок',
    description: 'Description...',
    rating: 145
  },
  {
    id: 3,
    title: 'Заголовок',
    description: 'accusamus aut adipisci.',
    rating: 145
  },
  {
    id: 4,
    title: 'Заголовок',
    description: 'Description...',
    rating: 145
  }
]

export const stubComments = {
  0: [
    {
      author: 'Дима',
      date: new Date(),
      text: 'Отличный пост, все кратко и по делу!'
    },
    {
      author: 'Маша',
      date: new Date(),
      text: 'Давно об этом разымшляла, а тут все так красиво изложено'
    }
  ]
}

export const PostPreviews: ArrayLike<string> = {
  1: Blog_1_Post_1,
  2: Blog_1_Post_2,
  3: Blog_1_Post_3,
  get length() {
    return Object.keys(this).length
  }
}
