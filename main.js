


const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const musicAudio = document.getElementById('audio')
const upButton = document.getElementById('Up-button')
const downButton = document.getElementById('Down-button')
const rightButton = document.getElementById('Right-button')
const leftButton = document.getElementById('Left-button')

let audio = new Audio("./tetris.mp3")

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30
let score = document.querySelector('span')
let initialScore = 0



canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// El game loop es la clave para mostrar.

const board = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,0,0,1,1,1]
    

]

//Piezas del jugador

const piece = {
    position: {x: 5, y: 5},
    shape: [
        [1,1],
        [1,1]
    ]
}

const randomPieces = [
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1,1,1]
    ],
    [
        [0,1,0],
        [1,1,1]
    ],
    [
        [1,1,0],
        [0,1,1]
    ],
    [
        [1,0],
        [1,0],
        [1,1]
]

]

/*
function update() {
    draw()
    window.requestAnimationFrame(update)
}*/

let dropCounter = 0
let lastTime = 0

function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time

    dropCounter += deltaTime

    if (dropCounter > 1000) {
        piece.position.y++
        dropCounter = 0

        if(checkCollision()) {
            piece.position.y--
            solidifyPiece()
            removeRows()
        }
    }

    

    draw()
    window.requestAnimationFrame(update)
}

function draw() {
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)

    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                context.fillStyle = 'yellow'
                context.fillRect(x , y , 1, 1)
            }
        })
    })

    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                context.fillStyle = 'red'
                context.fillRect(x + piece.position.x,y  + piece.position.y,1,1)
            }
        })
    })

    score.textContent = initialScore
    
}

document.addEventListener('keydown', event => {
    
    if (event.key === 'ArrowLeft') {
        piece.position.x--
    if (checkCollision()) {
        piece.position.x++
    }}
    if (event.key === 'ArrowRight') {piece.position.x++
        if (checkCollision()) {
            piece.position.x--
        }
    }
    if (event.key === 'ArrowDown') {piece.position.y++
        if(checkCollision()) {
            piece.position.y--
            solidifyPiece()
            removeRows()
        }
        
    }
        if (event.key === 'ArrowUp') {
            const rotated = []

            for (let i = 0; i < piece.shape[0].length; i++) {
                const row = []

                for (let j = piece.shape.length - 1; j >= 0; j--) {
                    row.push(piece.shape[j][i])
                    
                }
                rotated.push(row)
            }


            const previusShape = piece.shape
            piece.shape = rotated

            if(checkCollision()) {
                piece.shape = previusShape
            }
        }
    }
)

downButton.addEventListener('click', () => {
    
    piece.position.y++
        if(checkCollision()) {
            piece.position.y--
            solidifyPiece()
            removeRows()
        }
    
})

leftButton.addEventListener('click', () => {
    piece.position.x--
    if (checkCollision()) {
        piece.position.x++
    }

})

rightButton.addEventListener('click', () => {
    piece.position.x++
        if (checkCollision()) {
            piece.position.x--
        }
})

downButton.addEventListener('click', () => {
    piece.position.y++
        if(checkCollision()) {
            piece.position.y--
            solidifyPiece()
            removeRows()
        }

        playAudio()
})

upButton.addEventListener('click', () => {
    const rotated = []

            for (let i = 0; i < piece.shape[0].length; i++) {
                const row = []

                for (let j = piece.shape.length - 1; j >= 0; j--) {
                    row.push(piece.shape[j][i])
                    
                }
                rotated.push(row)
            }


            const previusShape = piece.shape
            piece.shape = rotated

            if(checkCollision()) {
                piece.shape = previusShape
            }
})

function checkCollision() {
    return piece.shape.find((row, y) => {
        return row.find((value, x) => {
            return(
                value !== 0 &&
                board[y + piece.position.y]?.[x + piece.position.x] !== 0
                
            )
        })
    })
    
    
}

function solidifyPiece() {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                board[y + piece.position.y][x + piece.position.x] = 1
            }
        })
    })
    //get aleatory shape
    piece.shape = randomPieces[Math.floor(Math.random() * randomPieces.length)]
    //Reset position
    piece.position.x = Math.floor(Math.random() * BOARD_WIDTH / 2)
    piece.position.y = 0
    if (checkCollision()) {
        alert('Game over!!')
        board.forEach(row => row.fill(0))
    }
}

function removeRows() {
    const rowsToRemove = []

    board.forEach((row, y) => {
        if (row.every(value => value === 1)) {
            rowsToRemove.push(y)
        }
    })

    rowsToRemove.forEach(y => {
        board.splice(y, 1)
        const newRow = Array(BOARD_WIDTH).fill(0)
        board.unshift(newRow)
        initialScore += 1
    })

    
}

update()

function playAudio() {
    
    audio.volume = 0.5
    audio.play()

}

musicAudio.addEventListener('click', () => {
    
    audio.volume = 0.5
    audio.play()
})

//board

