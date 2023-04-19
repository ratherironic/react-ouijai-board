interface AppInterface {
  error: string,
  status: string,
  question: string,
  answer: string,
  animations: Array<ReturnType<typeof setTimeout>>
}

export default AppInterface;