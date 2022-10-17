document.addEventListener("DOMContentLoaded", ()=>{start();});

function start(){
    const display = document.getElementById("main-display");
    const history = document.getElementById("history");
    const buttons = document.querySelectorAll("button");

    let expression = [];
    let partialSolution;

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
        try{
            calculator(e.key);
        }catch(error){
            alert(error);
            console.log(error);
        }
    }

    function calculate(){
        if(expression.length<3){
            console.log("here");
            alert("INVALID EXPRESSION");
            return "";
        }
        let result = expression.shift(),
            entry1 = expression.shift(),
            entry2 = expression.shift();

        result = operate(result, entry1, entry2);   

        if(result === Infinity){
            alert("CANNOT DIVIDE BY ZERO!")
            return "";
        }
        return result;
    }
    
    function getHistory(){
        let result = "";
        expression.forEach((entry)=>{
            result += entry+' ';
        });
        return result;
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
            result = result.toFixed(2);
        }
        return result;
    }

    const clear = () => {display.innerText = " "; history.innerText = " "; expression = [];}
    const enableDotButton = () => {document.getElementById("dot").disabled = false;}
    const disableDotButton = () => {document.getElementById("dot").disabled = true;}
    const checkValidExpression = () =>{
        if(display.innerText.length===0){
            console.log("here");
            throw "INVALID EXPRESSION";
        }
    };
    
    const calculatePartialSolution = () =>{
        expression.push(parseFloat(display.innerText));
        if(expression.length===3){
            partialSolution = operate(expression[0],expression[1],expression[2]); 
            if(partialSolution === Infinity){
                expression.pop();
                console.log("here");
                throw("CANNOT DIVIDE BY ZERO!");
            }else{
                expression = [];
                expression.push(partialSolution);
            }
        }
    }
    function calculator(value){
        switch(value){
            case 'AC':
            case 'Delete':
                clear();
                break;
            case 'C':
            case 'Backspace':
                display.innerText = display.innerText.slice(0,display.innerText.length-1);
                break;
            
            case '%':
            case ']':
                checkValidExpression();
                calculatePartialSolution();
                expression.push('%');
                history.innerText = getHistory();
                display.innerText = '';
                enableDotButton();
                break;
            case '+':
                checkValidExpression();
                calculatePartialSolution();
                expression.push('+');
                history.innerText = getHistory();
                display.innerText = '';
                enableDotButton();                
                break;
            case '-':
                checkValidExpression();
                calculatePartialSolution();
                expression.push('-');
                history.innerText = getHistory();
                display.innerText = '';
                enableDotButton();
                break;
            case '*':
                checkValidExpression();
                calculatePartialSolution();
                expression.push('*');
                history.innerText = getHistory();
                display.innerText = '';
                enableDotButton(); 
                break;
            case '/':
                checkValidExpression();
                calculatePartialSolution();
                expression.push('/');
                history.innerText = getHistory();
                display.innerText = '';
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
                display.innerText = calculate();
                if(display.innerText.length>0){
                    history.innerText = getHistory() + " = ";
                }else{
                    history.innerText =  "";
                }
                start = true;
                expression = [display.innerText];
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
                display.innerText += value;
                break;
            default:
                break;
        }
    }
}