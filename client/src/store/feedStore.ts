import { makeAutoObservable } from 'mobx'
import { FeedType, IPreviewPost } from '../utils/globalTypes'
import { DateRange } from '@mui/x-date-pickers-pro'
import Post from '../domain/Post'
import { Dayjs } from 'dayjs'
import { FeedData } from '../service/Post/Post.types'
import { RefObject } from 'react'

class FeedStore {
  feed: IPreviewPost[] = []
  feedType: FeedType = FeedType.Popular
  onlySubscription = false
  part = 0
  dates: DateRange<Dayjs> = [null, null]
  reversed = false
  hasMorePosts = true
  isLoading = false
  scrollable: RefObject<HTMLDivElement> | null = null
  constructor() {
    makeAutoObservable(this)
  }
  handlePart = async () => {
    this.part += 1
    await this.getFeed()
  }
  handleDates = (newDates: DateRange<Dayjs>) => {
    this.resetSecondaryParams()
    this.dates = newDates
    const [first, second] = this.dates

    if (first && second) {
      this.getFeed()
    }
  }
  handleReversed = () => {
    this.resetSecondaryParams()
    this.reversed = !this.reversed
    this.getFeed()
  }
  handlePopular = () => {
    this.resetSecondaryParams()
    this.feedType = FeedType.Popular
    this.getFeed()
  }
  handleNewest = () => {
    this.resetSecondaryParams()
    this.feedType = FeedType.Latest
    this.getFeed()
  }
  toggleSubscribes = () => {
    this.resetSecondaryParams()
    this.onlySubscription = !this.onlySubscription
    this.getFeed()
  }

  getFeed = async () => {
    const feedData: FeedData = {
      feedType: FeedType[this.feedType],
      onlySubscription: this.onlySubscription,
      part: this.part,
      reversed: this.reversed
    }
    const json = this.composeWithOptionals(feedData)
    const feedPosts = this.hasMorePosts ? await Post.getFeed(json) : []

    if (feedPosts.length === 0) {
      this.hasMorePosts = false
    }

    this.feed = this.part === 0 ? feedPosts : [...this.feed, ...feedPosts]
  }

  composeWithOptionals = (feedData: FeedData): FeedData => {
    const optionals: Partial<FeedData> = {}
    const [dateFrom, dateTo] = this.dates.map(
      (date) => date && date.format('YYYY-MM-DD')
    )

    optionals.dateFrom = dateFrom || undefined
    optionals.dateTo = dateTo || undefined
    const normalizeOptionals = Object.fromEntries(
      Object.entries(optionals).filter(([, value]) => value)
    )

    return { ...feedData, ...normalizeOptionals }
  }
  resetSecondaryParams = () => {
    this.part = 0
    this.hasMorePosts = true
    this.scrollable?.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  turnOnLoading = () => (this.isLoading = true)
  turnOffLoading = () => (this.isLoading = false)
  setScrollableContent = (scrollable: RefObject<HTMLDivElement> | null) => {
    this.scrollable = scrollable
  }
}

export default new FeedStore()
