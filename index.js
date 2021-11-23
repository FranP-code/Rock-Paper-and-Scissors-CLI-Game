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
    }
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

        function victoryMessage() {
            
            console.log('   ' + messagesList.victory[languageSelection])
        }

        function defeatMessage() {

            console.log('   ' + messagesList.defeat[languageSelection])
        }
        
        function translateOption(userSelection, actualLanguage, targetLanguage) {
        
            const index = messagesList.options[actualLanguage].findIndex((element) => element === userSelection)
        
            return messagesList.options[targetLanguage][index]
        }

        console.log('')
        console.log('   ' + messagesList.welcome[languageSelection])
        console.log('')
        
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

                console.log('   ' + messagesList.computerSelection[languageSelection] + translateOption(computerSelection, 'english', languageSelection))

                if (computerSelection === userSelection) {

                    console.log('   ' + messagesList.tie[languageSelection])
                    return
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
            })
    })