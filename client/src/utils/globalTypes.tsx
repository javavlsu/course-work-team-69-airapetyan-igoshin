export interface Post {
  id: number,
  header: string,
  description: string,
  picture: string,
  rating: number,
  views: number,
}

export interface Blog {
  id: number,
  title: string,
  description: string,
  subscribers: number,
  rating: number,
  picture: string,
}