const buttons = Array.from(document.querySelectorAll(".item"));
const display = document.getElementById("display");
let memory = [];
let number = '';

buttons.forEach(item => {
    item.addEventListener('click', function(event){
      input = event.target.value;
          
          if (isDigit(input) && (memory.length <1 || memory.length > 1)){ // the number will be added to memory if the memory is empty or there is a number and an operator in the memory
            
            number = number+input;
            display.innerText = number;

          } else if (isDigit(input) && memory.length === 1) { // if there is just one number in the memory it means it is the result of the previous calculation. If no operator is added after this number the memory is cleared to make room for a new number and a new calculation
            memory = [];            
            number = number+input;
            display.innerText = number;
          }

          if (isOperator(input)){              
                     
            if (number.length > 0) { // if the input is an operator and there was previously a number enetered, the number will be pushed to memory
              memory.push(parseInt(number));
            }

            if((input != '=') && !isOperator(memory.at(-1))) { // if the operator is not an equal sign, and the previous input was not an operator, it will be pushed to memory
              memory.push(input);
            } else if ((input != '=') && isOperator(memory.at(-1))){ // if the previous input already was an operator it will be removed from memory and the new operator will be pushed to memory
              memory.pop();
              memory.push(input);
            }
            number = ''; // after the operator is pushed to memory the 1st number gets wiped to make room for the second number
          }
          
          if (input === '=') {
            
            let result = operate(memory);
            display.innerText = result;
            memory = [];
            memory.push(result);
            
          }
          
          if (input === 'Clear'){
            memory = [];
            display.innerText = '';
          }
        })
        
    })

function isDigit (input) {
  return input >= '0' && input <= '9'; 
}

function isOperator (input) {
  return '/*-+='.includes(input);
}

function operate(operateOn){
  if (operateOn[1] === '+'){
    return operateOn[0] + operateOn [2];
  } else if (operateOn[1] === '-') {
    return operateOn[0] - operateOn [2];
  } else if (operateOn[1] === '*') {
    return operateOn[0] * operateOn [2];
  } else {
    if (operateOn[2] === 0) {
      return('There will be no dividing by 0 here!');      
    }
    return parseFloat((operateOn[0] / operateOn [2]).toFixed(2));
  }
}


    
  