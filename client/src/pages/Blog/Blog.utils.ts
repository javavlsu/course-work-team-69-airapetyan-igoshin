export function parseToChunks<T>(arr: T[], columns: number): T[][] {
  const output: T[][] = []

  arr.forEach((el, index) => {
    if (output[index % columns]) {
      output[index % columns].push(el)
    } else {
      output[index % columns] = []
      output[index % columns].push(el)
    }
  })

  return output
}
