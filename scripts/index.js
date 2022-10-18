document.addEventListener("DOMContentLoaded", ()=>{
    const display = document.getElementById("main-display");
    const history = document.getElementById("history");
    const buttons = document.querySelectorAll("button");

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
        console.log(e.key);
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
                alert("ERROR");
                break;
        }
        if(result !== Math.floor(result)){
            result = parseFloat(result).toFixed(2);
        }
        return result;
    }

    const clear = () => {display.innerText = ""; history.innerText = ""; expression = [];enableDotButton();}
    const enableDotButton = () => {document.getElementById("dot").disabled = false;}
    const disableDotButton = () => {document.getElementById("dot").disabled = true;}
    const prepareForNextEntry = () => {history.innerText = getHistory();display.innerText = '';};
    const checkValidExpression = () =>{
        if(display.innerText.length===0){
            console.log("Display length is zero.");
            throw "INVALID EXPRESSION";
        }
    };
    
    const calculatePartialSolution = () =>{
        let partialSolution;
        if(expression.length === 3){
            partialSolution = parseFloat(operate(expression[0],expression[1],expression[2]));
            console.log("Expression: ["+expression+"]");
            console.log("Partial solution: "+partialSolution);
            if(Math.abs(partialSolution) === Infinity){
                expression.pop();
                console.log("Partial solution was Infinity");
                throw "CANNOT DIVIDE BY ZERO!";
            }

            expression = [];
            expression.push(partialSolution);
            
        }
        return partialSolution;
    }
    function calculator(value){
        switch(value){
            case 'AC':
            case 'Delete':
                clear();
                break;
            case 'C':
            case 'Backspace':
                if(display.innerText.charAt(display.innerText.length-1)==='.'){
                    enableDotButton();
                }
                display.innerText = display.innerText.slice(0,display.innerText.length-1);
                break;
            case '%':
            case ']':
                checkValidExpression();
                expression.push(parseFloat(display.innerText));
                calculatePartialSolution();
                expression.push('%');
                prepareForNextEntry();
                enableDotButton();
                break;
            case '+':
                checkValidExpression();
                expression.push(parseFloat(display.innerText));
                calculatePartialSolution();
                expression.push('+');
                prepareForNextEntry();
                enableDotButton();                
                break;
            case '-':
                checkValidExpression();
                expression.push(parseFloat(display.innerText));
                calculatePartialSolution();
                expression.push('-');
                prepareForNextEntry();
                enableDotButton();
                break;
            case '*':
                checkValidExpression();
                expression.push(parseFloat(display.innerText));
                calculatePartialSolution();
                expression.push('*');
                prepareForNextEntry();
                enableDotButton(); 
                break;
            case '/':
                checkValidExpression();
                expression.push(parseFloat(display.innerText));
                calculatePartialSolution();
                expression.push('/');
                prepareForNextEntry();
                enableDotButton(); 
                break;
            case ',':
            case '.':
                checkValidExpression();
                disableDotButton();
                display.innerText += '.';
                break;
            case 'Enter':
            case '=':
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
                if(display.innerText === '0'){
                    display.innerText = '';
                }
                display.innerText += value;
                break;
            default:
                break;
        }
    }
});