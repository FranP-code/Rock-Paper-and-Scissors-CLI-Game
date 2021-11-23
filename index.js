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
    }
}

function victoryMessage() {

    console.log('   ' + messagesList.victory[languageSelection])
}

// function translateOption() {


// }

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
        console.log('   ' + messagesList.welcome[languageSelection])
        console.log('')
        
        const options = [...messagesList.options[languageSelection]]

        inquirer.prompt({

            name: 'userSelecction',
            message: messagesList.play[languageSelection],
            type: 'list',

            choices: options
        })

            .then((answer) => {

                const computerSelection = options[Math.floor(Math.random() * options.length)]
                const userSelection = answer.userSelecction

                if (computerSelection === userSelection) {

                    console.log('   ' + messagesList.tie[languageSelection])
                    return
                }

            })
    })