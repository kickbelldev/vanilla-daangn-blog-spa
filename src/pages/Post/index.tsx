interface PageProps extends Record<string, unknown> {
  pageParams: string[]
}

const Post = (props?: PageProps) => {
  return <div>{props?.pageParams}번 글</div>
}

export default Post
