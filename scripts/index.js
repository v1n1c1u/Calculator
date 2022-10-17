document.addEventListener("DOMContentLoaded", ()=>{start();});

function start(){
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
            switch(button.value){
                case 'AC':
                    clear();
                    break;
                case 'C':
                    expression.pop();
                    break;
                case '%':
                    expression.push(parseFloat(display.innerText));
                    expression.push('%');
                    history.innerText += display.innerText + " % ";
                    display.innerText = '';
                    break;
                case '+':
                    expression.push(parseFloat(display.innerText));
                    expression.push('+');
                    history.innerText += display.innerText + " + ";
                    display.innerText = '';
                    break;
                case '-':
                    expression.push(parseFloat(display.innerText));
                    expression.push('-');
                    history.innerText += display.innerText + " - ";
                    display.innerText = '';
                    break;
                case '*':
                    expression.push(parseFloat(display.innerText));
                    expression.push('*');
                    history.innerText += display.innerText + " * ";
                    display.innerText = '';
                    break;
                case '/':
                    expression.push(parseFloat(display.innerText));
                    expression.push('/');
                    history.innerText += display.innerText + " / ";
                    display.innerText = '';
                    break;
                case '.':
                    display.innerText += button.value;
                    break;
                case '=':
                    expression.push(parseFloat(display.innerText));
                    history.innerText += display.innerText + " = ";
                    start = true;
                    display.innerText = calculate();                    
                    break;
                default:
                    display.innerText += button.value;
                    break;
            }
        })
    });
    function calculate(){
        console.log(expression);
        if(expression.length<3){
            alert("INVALID EXPRESSION");
            return " ";
        }
        let entry1,
            entry2,
            result = expression.shift();

        do{
            entry1 = expression.shift();
            entry2 = expression.shift();

            console.log(entry1);
            console.log(entry2);

            if(isOperator(entry1) && !isNaN(entry2)){
                result = operate(result, entry1, entry2);
            }else{
                alert("INVALID EXPRESSION");
                clear();
                return " ";
            }
        }
        while(expression.length>0)

        if(result === Infinity){
            alert("CANNOT DIVIDE BY ZERO!")
            clear();
            result = " ";
        }
        return result;
    }
    function operate (factorA, operator, factorB){
        switch(operator){
            case '+':
                return factorA + factorB;
            case '-':
                return factorA - factorB;
            case '*':
                return factorA * factorB;
            case "/":
                return factorA / factorB;
            case "%":
                return factorA % factorB;
            default:
                alert("ERROR");
                break;
        }
    }
    const clear = () => {display.innerText = " "; history.innerText = " "; expression = [];}
    const isOperator = (entry) => { return (entry === "%" || entry === "+" || entry === "-" || entry === "/" || entry === "*")}
}

