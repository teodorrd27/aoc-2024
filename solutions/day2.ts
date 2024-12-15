const headers: HeadersInit = new Headers({
  Cookie: `session=${Bun.env.SESSION_COOKIE};`,
})
const response = await fetch('https://adventofcode.com/2024/day/2/input', {
  headers
})
const input = await response.text()
const lines = input.split('\n').filter(line => line).map(line => line.split(' ').map(num => parseInt(num)))

const checkSafe = (arr: number[]) => {
  const [first, second] = arr
  if (first === second) {
    return false
  }
  const increasing = second > first ? true : false

  return arr.reduce((prev, _, ix, arr) => {
    if (ix === arr.length - 1) return prev

    const localCur = arr[ix]
    const localNext = arr[ix + 1]
    const delta = localCur - localNext
    if (delta === 0 || Math.abs(delta) > 3) return false
    if (delta < 0 && !increasing) return false
    if (delta > 0 && increasing) return false
    return prev
  }, true)
}

console.log('Day 2: __________________')
const safes = lines.reduce((prev, cur) => {
  const safe = checkSafe(cur)
  return safe ? ++prev : prev
}, 0)

console.log('\tPart 1: ', safes)

const arrayPossibilities = (arr: number[]) => {
  const possibilities = []
  for (let i = 0; i < arr.length; i++) {
    possibilities.push(arr.filter((_, ix) => i !== ix))
  }
  return possibilities
}

const part2Safes = lines.reduce((prev, cur) => {
  const configs = arrayPossibilities(cur)
  const safe = configs.reduce((prev, cur) => {
    const localSafe = checkSafe(cur)
    return localSafe ? true : prev
  }, false)

  return safe ? ++prev : prev
}, 0)

console.log('\tPart 2: ', part2Safes)
console.log('_________________________')