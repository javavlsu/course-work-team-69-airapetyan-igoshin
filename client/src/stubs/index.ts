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
