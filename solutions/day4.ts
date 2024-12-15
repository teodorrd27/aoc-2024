const headers: HeadersInit = new Headers({
  Cookie: `session=${Bun.env.SESSION_COOKIE};`,
})
const response = await fetch('https://adventofcode.com/2024/day/4/input', {
  headers
})
const input = await response.text()

const horizontalLRMatrix = input.split('\n').map(line => line.split(''))

let verticalUDMatrix: string[][] = []
for (let i = 0; i < horizontalLRMatrix[0].length; i++) {
  verticalUDMatrix.push([])
}

for (let i = 0; i < horizontalLRMatrix.length; i++) {
  const row = horizontalLRMatrix[i]
  for (let j = 0; j < row.length; j++) {
    verticalUDMatrix[j][i] = row[j]
  }
}

const parametricCompute = (t: number, p1: number, p2: number) => p1 + t * (p2 - p1)

const diagonalLRProjectorMinLength = (inputMatrix: string[][], minLength: number = 4) => {

}

console.log(verticalUDMatrix)