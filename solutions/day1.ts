const day1 = Bun.file('data/day1.csv')
const input = await day1.text()
const lines = input.split('\n')
const col1: string[] = []
const col2: string[] = []

lines.forEach(line => {
  const [part1, part2] = line.split('   ')
  col1.push(part1)
  col2.push(part2)
})

col1.sort((a, b) => parseInt(a) - parseInt(b))
col2.sort((a, b) => parseInt(a) - parseInt(b))

const delta = col1.reduce((prev, cur, ix) => {
  return prev + Math.abs(parseInt(cur) - parseInt(col2[ix]))
}, 0)

console.log('Part 1: ', delta)

const col1FrequencyTable = col1.reduce((prev, cur) => {
  const access = prev[cur]
  if (!access) {
    prev[cur] = 1
  } else {
    prev[cur]++
  }
  return prev
}, {} as Record<string, number>)

const col2aggregate = col2.reduce((prev, cur) => {
  const access = prev[cur]
  if (!access) {
    prev[cur] = parseInt(cur)
  } else {
    prev[cur] += parseInt(cur)
  }
  return prev
}, {} as Record<string, number>)

const sum = Object.entries(col1FrequencyTable).reduce((prev, [key, value]) => {
  return col2aggregate[key] ? prev + value * col2aggregate[key] : prev
}, 0)

console.log('Part 2: ', sum)