const headers: HeadersInit = new Headers({
  Cookie: `session=${Bun.env.SESSION_COOKIE};`,
})
const response = await fetch('https://adventofcode.com/2024/day/3/input', {
  headers
})
const input = await response.text()
console.log('Day 3: __________________')
const matches = input.match(/mul\(\b\d{1,3}\b,\b\d{1,3}\)/gm)
const extractOperands = (matches: RegExpMatchArray | null) => matches?.map(match => match.match(/\b\d{1,3}/gm)?.map(no => parseInt(no))) as [number, number][]

const mul = (a: number, b: number) => a * b
const result = extractOperands(matches).reduce((prev, [a, b]) => {
  return prev + mul(a, b)
}, 0)

console.log('\tPart 1: ', result)

const filteredMatches = input.replaceAll('\n', '').replaceAll(/don\'t\(\).*?do\(\)/gm, '')
const matched = filteredMatches.match(/mul\(\b\d{1,3}\b,\b\d{1,3}\)/gm)
const resultPart2 = extractOperands(matched).reduce((prev, [a, b]) => {
  return prev + mul(a, b)
}, 0)

console.log('\tPart 2: ', resultPart2)
console.log('_________________________')