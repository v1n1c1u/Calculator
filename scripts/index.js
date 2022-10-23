document.addEventListener("DOMContentLoaded", ()=>{
    const display = document.getElementById("main-display");
    const history = document.getElementById("history-display");
    const buttons = document.querySelectorAll("button");
    const dotButton = document.getElementById("dot");

    let expression = [];
    let start = true;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if(start){
                clear();
                start = false;
            }
            try{
                calculator(button.value);
            }catch(e){
                alert(e);
                console.log(e);
            }
        })
    });

    document.onkeydown = function (e) {
        if(start){
            clear();
            start = false;
        }
        console.log(`Key pressed: ${e.key}`);
        try{
            calculator(e.key);
        }catch(error){
            alert(error);
            console.log(error);
        }
    }
    
    function getHistory(){
        let history = "";
        expression.forEach((entry)=>{
            history += entry+' ';
        });
        return history;
    }

    function operate (factorA, operator, factorB){
        let result = 0;
        switch(operator){
            case '+':
                result = factorA + factorB;
                break;
            case '-':
                result = factorA - factorB;
                break;
            case '*':
                result = factorA * factorB;
                break;
            case "/":
                result = factorA / factorB;
                break;
            case "%":
                result = factorA % factorB;
                break;
            default:
                throw `ERROR: Unknown error while operating ${factorB, operator, factorB}`;
        }
        if(hasDecimalPoints(result)){
            result = parseFloat(result).toFixed(4);
        }
        return result;
    }

    const calculatePartialSolution = () =>{
        let partialSolution;
        if(expression.length === 3){
            partialSolution = parseFloat(operate(expression[0],expression[1],expression[2]));
            console.log(`Expression: [${expression}]`);
            console.log(`Partial solution: ${partialSolution}`);
            if(Math.abs(partialSolution) === Infinity || isNaN(partialSolution)){
                expression.pop();
                throw "CANNOT DIVIDE BY ZERO!";
            }
            expression = [];
            expression.push(partialSolution);
        }
        return partialSolution;
    }

    function calculator(value){
        switch(typeOfEntry(value)){
            case "DELETE":
                clear();
                break;
            case "BACKSPACE":
                if(display.innerText.charAt(display.innerText.length-1)==='.'){
                    enableDotButton();
                }
                if(display.innerText.length===0  && isOperator(expression[expression.length-1])){
                    display.innerText = expression[0];
                    expression = [];
                    history.innerText = '';
                }else{
                    display.innerText = display.innerText.slice(0,display.innerText.length-1);
                }
                break;
            case "OPERATOR":
                checkValidExpression();
                expression.push(parseFloat(display.innerText));
                calculatePartialSolution();
                expression.push(value);
                prepareForNextEntry();
                enableDotButton();
                break;
            case "DOT":
                if(!dotButton.disabled){
                    checkValidExpression();
                    display.innerText += '.';
                    disableDotButton();
                }
                break;
            case "EQUALS":
                if(expression.length===0 && display.innerText.length > 0){
                    history.innerText = display.innerText + " = ";
                    start = true;
                    break;
                }
                checkValidExpression();
                expression.push(parseFloat(display.innerText));
                history.innerText = getHistory() + " = ";
                try{
                    display.innerText = calculatePartialSolution();
                    expression = [display.innerText];
                }catch(e){
                    alert(e);
                    clear();
                }
                start = true;
                break;
            case "NUMBER":
                if(display.innerText === '0'){
                    display.innerText = '';
                }
                display.innerText += value;
                break;
            default:
                break;
        }
    }
    const isOperator = (value) => (value === '+' || value === '-' || value === '/' || value === '*' || value ==="%");
    const clear = () => {display.innerText = ""; history.innerText = ""; expression = [];enableDotButton();}
    const enableDotButton = () => {dotButton.disabled = false;}
    const disableDotButton = () => {dotButton.disabled = true;}
    const hasDecimalPoints = (num) => {return num !== Math.floor(num)};
    const isNaN = (value) => {return value !== value;}
    const prepareForNextEntry = () => {history.innerText = getHistory();display.innerText = '';};
    const checkValidExpression = () =>{
        if(display.innerText.length=== 0){
            throw "INVALID EXPRESSION";
        }
    };
    const typeOfEntry = (value)=>{
        switch(value){
            case 'Delete':
                return "DELETE";
            case 'Backspace':
                return "BACKSPACE";
            case '%':
            case ']':
            case '+':
            case '-':
            case '*':
            case '/':
                return "OPERATOR";
            case ',':
            case '.':
                return "DOT";
            case 'Enter':
                return "EQUALS";
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return "NUMBER";
            default:
                return "INVALID";
        }
    }
});