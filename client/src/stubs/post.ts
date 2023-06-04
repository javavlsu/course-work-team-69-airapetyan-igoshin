import { Blog_1_Post_1, Blog_1_Post_2, Blog_1_Post_3 } from '../assets'

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
