function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const ramdomNumberBetweenZeroAndTen = getRndInteger(0, 10)
// console.log(ramdomNumberBetweenZeroAndTen)
const argument = process.argv[2]
const number = Number(process.argv[3])
const result = number + ramdomNumberBetweenZeroAndTen
console.log(result)
if(!Number(number)){
    console.log("Você não preencheu os dados corretamente!!")
} else{
    switch (argument) {
        case "par":
            if (result % 2 === 0) {
                console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${result}. Você ganhou!`)
                break
            } else if(!(result % 2 === 0)) {
                console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${result}. Você perdeu!`)
                break
            }
        case "impar":
            if(!(result % 2 === 0)){
                console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${result}. Você ganhou!`) 
                break           
            } else if(result % 2 === 0) {
                console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${result}. Você perdeu!`) 
                break           
            }
            default:
                console.log("Você não expecificou se o numero é PAR ou IMPAR!!!")   
    }
}

