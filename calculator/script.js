const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const resultBtn = document.getElementById('result');
const clearBtns = document.querySelectorAll('.clear');
const minusBtn = document.getElementById('minus');
const sqrtBtn = document.getElementById('sqrt');
const decimalBtn = document.getElementById('decimal');
const display =  document.getElementById('display');

let memoryNumber = 0;
let newNumber = false;  
let memoryOperation = '';

//click for all of numberbtns
for (let i = 0; i < numberBtns.length; i++) {
  let number = numberBtns[i];
  number.addEventListener("click", function(e){
    pressedNumber(e.target.textContent);
   });
};

for (let i = 0; i < operationBtns.length; i++) {
  let operation = operationBtns[i];
  operation.addEventListener("click", function(e){
    operationFunction(e.target.textContent);
   /* console.log(e.target.textContent)*/
   });
};

 for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function(e){
    clearFunction(e.srcElement.id)
    /*console.log(e)*/
  });
};
 
minusBtn.addEventListener("click", minusFunction);
sqrtBtn.addEventListener("click", sqrtFunction);
decimalBtn.addEventListener("click", decimalFunction);
 
function minusFunction() {
display.value = -display.value;
}

function sqrtFunction() {
  let localMemory = display.value;
  if (localMemory.charAt(0) === '-'){
    alert ("Error!You can't take square root of a negative number.")
  } else {
    display.value = Math.sqrt(localMemory);
  }
  
}

function clearFunction(id) {
  if (id === 'ac') {
    display.value = '0';
   newNumber = true;
  } else if (id === 'delete') {
    display.value = '0';
    newNumber = true;
    memoryNumber = 0;
    memoryOperation = '';
  }
 }


function pressedNumber (number){
  if (newNumber){
    display.value = number;
    newNumber = false;
  } else {
    if(display.value === '0'){
      display.value = number;
    }else{
      display.value += number;
    }
  }
}

function operationFunction(symbol){
  let localMemory = display.value;

  if (newNumber && memoryOperation !== '=') {
    display.value = memoryNumber;
  } else {
    newNumber = true;
    if (memoryOperation === '+') {
      memoryNumber += parseFloat(localMemory);
      
    } else if (memoryOperation === '-') {
      memoryNumber -= parseFloat(localMemory);
    } else if (memoryOperation === '*') {
      memoryNumber *= parseFloat(localMemory);
    } else if (memoryOperation === '/') {
      memoryNumber /= parseFloat(localMemory);
    }else if (memoryOperation === 'nx') {
      memoryNumber = Math.pow(memoryNumber,parseFloat(localMemory));
    } else {
      memoryNumber = parseFloat(localMemory);
    }
    
    display.value = parseFloat(memoryNumber.toFixed(10)); 
    /*console.log(display.value)*/
    memoryOperation = symbol;
  }
}

function decimalFunction(){
  let localDecimalMemory = display.value;

  if (newNumber) {
    localDecimalMemory = '0.';
    newNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}
