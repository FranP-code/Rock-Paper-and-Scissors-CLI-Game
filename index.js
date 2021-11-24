const inquirer = require('inquirer')
const colors = require('colors')

const messagesList = require('./scripts/messagesList.js')

victoryCount = 0
consecutiveVictoryCount = 0
defeatCount = 0

function gameLogic(languageSelection) {

    function showStats() {

        console.log()
        console.log(messagesList.stats.title[languageSelection].underline.bold)
        console.log(messagesList.stats.victory[languageSelection] + victoryCount.toString().bold)
        console.log(messagesList.stats.consecutiveVictory[languageSelection] + consecutiveVictoryCount.toString().bold)
        console.log(messagesList.stats.defeat[languageSelection] + defeatCount.toString().bold)
    }

    function victoryMessage() {
        
        victoryCount++
        consecutiveVictoryCount++
        console.log(messagesList.victory[languageSelection].bold.green)
    }

    function defeatMessage() {

        defeatCount++
        consecutiveVictoryCount = 0
        console.log(messagesList.defeat[languageSelection].bold.red)
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
            console.log(messagesList.computerSelectionTitle[languageSelection].underline.bold)
            console.log(messagesList.computerSelection[languageSelection] + colors.bold(translateOption(computerSelection, 'english', languageSelection)))
            console.log()

            console.log(messagesList.resultTitle[languageSelection].underline.bold)

            if (computerSelection === userSelection) {

                console.log(messagesList.tie[languageSelection].bold.yellow)
            }

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
                        
                        console.clear()
                        console.log()
                        console.log(messagesList.gameTitle[languageSelection].bold.brightBlue)
                        console.log()

                        gameLogic(languageSelection)
                        return
                    }

                    if (response === 'No') {

                        console.log()
                        console.log(messagesList.thanksForPlay[languageSelection].bold.brightYellow)
                        console.log()
                        return
                    }
    
                })
        })
}

console.clear()

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
        console.log(messagesList.welcome[languageSelection].bold.brightBlue)
        console.log('')
        
        gameLogic(languageSelection)
        
    })