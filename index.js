const inquirer = require('inquirer')

const messagesList = {

    welcome: {

        english: 'Welcome to the Rock Paper and Scissors CLI game!',
        spanish: '¡Bienvenido al juego de Piedra Papel o Tijeras desde la consola!'
    },

    play: {

        english: 'Select one option:',
        spanish: 'Selecciona una opción'
    },

    options: {

        english: ['Rock', 'Paper', 'Scissors'],
        spanish: ['Piedra', 'Papel', 'Tijeras']
    },

    tie: {

        english: 'The result is a draw! GG',
        spanish: 'Empate! Bien Jugado.'
    },

    victory: {

        english: 'You win!',
        spanish: 'Ganaste!'
    },

    defeat: {

        english: 'You lost...',
        spanish: 'Perdiste...'
    },

    computerSelection: {

        english: 'Computer selection is ',
        spanish: 'La selección de la computadora es '
    },

    stats: {

        title: {

            english: 'Stats:',
            spanish: 'Estadisticas:'
        },

        victory: {

            english: '  - Victory count: ',
            spanish: '  - Victorias: '
        },

        consecutiveVictory: {

            english: '      - Consecutive victory count: ',
            spanish: '      - Victorias consecutivas: ',
        },

        defeat: {

            english: '  - Defeat count: ',
            spanish: '  - Derrotas: ',
        },
    },

    playAgain: {

        title: {

            english: 'Do you wanna play again?',
            spanish: '¿Quieres jugar otra vez?'
        },

        options: {

            english: ['Yes', 'No'],
            spanish: ['Sí', 'No']
        }
    },

    thanksForPlay: {

        english: 'Thanks for playing! Francisco Pessano',
        spanish: 'Gracias por jugar! Francisco Pessano'
    }
}

victoryCount = 0
consecutiveVictoryCount = 0
defeatCount = 0

function gameLogic(languageSelection) {

    function showStats() {

        console.log()
        console.log(messagesList.stats.title[languageSelection])
        console.log(messagesList.stats.victory[languageSelection] + victoryCount)
        console.log(messagesList.stats.consecutiveVictory[languageSelection] + consecutiveVictoryCount)
        console.log(messagesList.stats.defeat[languageSelection] + defeatCount)
    }

    function victoryMessage() {
        
        victoryCount++
        consecutiveVictoryCount++
        console.log(messagesList.victory[languageSelection])
    }

    function defeatMessage() {

        defeatCount++
        consecutiveVictoryCount = 0
        console.log(messagesList.defeat[languageSelection])
    }
    
    function translateOption(userSelection, actualLanguage, targetLanguage) {
    
        const index = messagesList.options[actualLanguage].findIndex((element) => element === userSelection)
    
        return messagesList.options[targetLanguage][index]
    }

    function translatePlayAgainOption(userSelection, actualLanguage, targetLanguage) {

        const index = messagesList.playAgain.options[actualLanguage].findIndex((element) => element === userSelection)
    
        return messagesList.playAgain.options[targetLanguage][index]
    }

    inquirer.prompt({

        name: 'userSelecction',
        message: messagesList.play[languageSelection],
        type: 'list',

        choices: [...messagesList.options[languageSelection]]
    })

        .then((answer) => {

            const options = [...messagesList.options['english']]
            const computerSelection = options[Math.floor(Math.random() * options.length)]
            
            let userSelection = answer.userSelecction
                userSelection = translateOption(userSelection, languageSelection, 'english')

            console.log()
            console.log(messagesList.computerSelection[languageSelection] + translateOption(computerSelection, 'english', languageSelection))

            if (computerSelection === userSelection) {

                console.log(messagesList.tie[languageSelection])
            }

            // if (computerSelection === 'Rock') {

            //     if (userSelection === 'Paper') {

            //         victoryMessage()
            //         return
            //     }

            //     if (userSelection === 'Scissors') {

            //         defeatMessage()
            //         return
            //     }
                
            //     return
            // }

            // if (computerSelection === 'Paper') {

            //     if (userSelection === 'Rock') {

            //         defeatMessage()
            //         return
            //     }

            //     if (userSelection === 'Scissors') {

            //         victoryMessage()
            //         return
            //     }
                
            //     return
            // }

            // if (computerSelection === 'Scissors') {

            //     if (userSelection === 'Rock') {

            //         victoryMessage()
            //         return
            //     }

            //     if (userSelection === 'Paper') {

            //         defeatMessage()
            //         return
            //     }
                
            //     return
            // }

            switch (computerSelection) {

                case 'Rock':

                    if (userSelection === 'Paper') {

                        victoryMessage()
                    }

                    if (userSelection === 'Scissors') {

                        defeatMessage()
                    }
                        
                    break;
                
                case 'Paper': 

                    if (userSelection === 'Rock') {

                        defeatMessage()
                    }
        
                    if (userSelection === 'Scissors') {
        
                        victoryMessage()
                    }
                            
                    break;

                case 'Scissors':

                    if (userSelection === 'Rock') {

                        victoryMessage()
                    }
        
                    if (userSelection === 'Paper') {

                        defeatMessage()
                    }

                    break;

                default:
                    break;
            }

            showStats()

            console.log('')

            inquirer.prompt({

                name: 'playAgain',
                message: messagesList.playAgain.title[languageSelection],
                type: 'list',
        
                choices: [...messagesList.playAgain.options[languageSelection]]
            })
                .then((answer) => {
    
                    const response = translatePlayAgainOption(answer.playAgain, languageSelection, 'english')

                    if (response === 'Yes') {
                        
                        console.log('----------------')
                        console.log()
                        gameLogic(languageSelection)
                        return
                    }

                    if (response === 'No') {

                        console.log()
                        console.log(messagesList.thanksForPlay[languageSelection])
                        console.log()
                        return
                    }
    
                })
        })
}

inquirer.prompt({
    
    name: 'languageSelect',
    message: 'Select language:',
    default: 'English',
    type: 'list',

    choices: ['English', 'Spanish']
})

    .then((answer) => {
        
        const languageSelection = answer.languageSelect.toLowerCase()

        console.log('')
        console.log(messagesList.welcome[languageSelection])
        console.log('')
        
        gameLogic(languageSelection)
        
    })