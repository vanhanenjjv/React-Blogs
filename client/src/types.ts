export type BlogParams = {
  id: string
}

export type Blog = {
  id: string
  title: string
  author: string
  url: string
  likes: number
  comments: Array<any>
}