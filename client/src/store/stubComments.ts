import { makeAutoObservable } from 'mobx'
import { CommentProps } from '../components/Comment'
import { stubComments } from '../stubs'

interface Comments {
  [K: number]: CommentProps[]
}

class StubComments {
  comments: Comments = stubComments

  constructor() {
    makeAutoObservable(this)
  }
  add(postId: number, comment: CommentProps) {
    if (!this.comments[postId]) {
      this.comments[postId] = []
    }

    this.comments[postId].unshift(comment)
  }
}

export default new StubComments()
