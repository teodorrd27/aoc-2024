const headers: HeadersInit = new Headers({
  Cookie: `session=${Bun.env.SESSION_COOKIE};`,
})
const response = await fetch('https://adventofcode.com/2024/day/2/input', {
  headers
})
const input = await response.text()
const lines = input.split('\n').filter(line => line).map(line => line.split(' ').map(num => parseInt(num)))

console.log('Day 2: __________________')
const safes = lines.reduce((prev, cur) => {
  const [first, second] = cur
  if (first === second) {
    return prev
  }
  const increasing = second > first ? true : false

  const safe = cur.reduce((prev, _, ix, arr) => {
    if (ix === arr.length - 1) return prev

    const localCur = arr[ix]
    const localNext = arr[ix + 1]
    const delta = localCur - localNext
    if (delta === 0 || Math.abs(delta) > 3) return false
    if (delta < 0 && !increasing) return false
    if (delta > 0 && increasing) return false
    return prev
  }, true)
  return safe ? ++prev : prev
}, 0)

console.log('\tPart 1: ', safes)

