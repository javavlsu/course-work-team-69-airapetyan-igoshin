import { makeAutoObservable } from 'mobx'
import { CommentProps } from '../components/Comment'
import { stubComments } from '../stubs'

class StubComments {
  comments: CommentProps[] = stubComments

  constructor() {
    makeAutoObservable(this)
  }
  add(comment: CommentProps) {
    this.comments.unshift(comment)
  }
}

export default new StubComments()
