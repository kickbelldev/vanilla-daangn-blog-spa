const pathToRegex = (path: string) => {
  return new RegExp('^' + path.replace(/:\w+/g, '(.+)') + '$')
}
export default pathToRegex
