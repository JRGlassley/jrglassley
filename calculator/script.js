let displayDiv = null;
let display = "0";
let accumulator = "0";
let operation = "";
let clearOnNextKeypress = false;

window.onload = (event) => {
   displayDiv = document.querySelector(".display");
   setDisplay();

   // setup button action
   Array.from(Array(10).keys()).forEach(i => {
      setupButton(`#button-${i}`, i);
   });
   document.querySelector("#clear").addEventListener('click', () => clear());
   document.querySelector("#decimal").addEventListener('click', () => addDecimal());
   document.querySelector("#equals").addEventListener('click', () => equals());
   document.querySelector("#multiply").addEventListener('click', () => handleClick("multiply"));
   document.querySelector("#divide").addEventListener('click', () => handleClick("divide"));
   document.querySelector("#add").addEventListener('click', () => handleClick("add"));
   document.querySelector("#subtract").addEventListener('click', () => handleClick("subtract"));
};

function setupButton(selector, value) {
   const button = document.querySelector(selector);
   button.addEventListener("click", () => addDigit(value));
}

function addDigit(number) {
   if (clearOnNextKeypress) {
      clearOnNextKeypress = false;
      display = "0";
   }
   if (display === "0") {
      display = "";
   }
   display = display + number.toString();
   setDisplay();
}

function clear() {
   clearOnNextKeypress = false;
   display = "0";
   accumulator = "0";
   operation = "";
   setDisplay();
}

function addDecimal() {
   if (clearOnNextKeypress) {
      clearOnNextKeypress = false;
      display = "0";
   }
   display = display + ".";
   setDisplay();
}

function setDisplay() {
   if (display.length > 10) {
      displayDiv.textContent = "Overflow :)";
      operation = "";
      accumulator = "";
      display = "";
      clearOnNextKeypress = true;
   } else {
      displayDiv.textContent = display;
   }
}

function handleClick(action) {
   // handle back-to-back operation clicks
   if (!clearOnNextKeypress) {
      equals();
   }

   accumulator = display;
   operation = action;
   clearOnNextKeypress = true;
}

function equals() {
   // handle back-to-back operation clicks
   if (clearOnNextKeypress || operation === "") {
      return;
   }
   const result = performOperation(operation);
   display = result.toString();
   setDisplay();
   operation = "";
   accumulator = "";
   clearOnNextKeypress = true;
}

/**
 * Perform an operation "acc op display"
 * @param {string} op 
 */
function performOperation(op) {
   let result = 0;
   switch (op) {
      case "multiply":
         result = parseFloat(accumulator) * parseFloat(display)
         break;
      case "divide":
         if (parseFloat(display) === 0) {
            return "Div by 0!";
         }
         result = parseFloat(accumulator) / parseFloat(display)
         // round to 4 digits
         result = parseFloat(result.toFixed(4));
         if (result === 0) {
            return "Underflow";
         }
         break;
      case "add":
         result = parseFloat(accumulator) + parseFloat(display)
         break;
      case "subtract":
         result = parseFloat(accumulator) - parseFloat(display)
         break;
      default:
         console.error("Unknown operation: " + operation);
   }
   return result;
}