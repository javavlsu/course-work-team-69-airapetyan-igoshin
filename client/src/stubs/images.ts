import { Nature, LogoBlog_1 } from '../assets'

export const blogPreviewImages: ArrayLike<string> = {
  1: Nature,
  get length() {
    return Object.keys(this).length
  }
}

export const blogLogos: ArrayLike<string> = {
  1: LogoBlog_1,
  get length() {
    return Object.keys(this).length
  }
}
