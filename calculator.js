// Simple JavaScript Calculator
// This program asks the user for two numbers and an operation,
// then performs the calculation and displays the result

const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to ask a question and get response
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Function to get user input using readline
async function getUserInput() {
    let num1, num2, operation;
    
    // Get first number
    do {
        num1 = await askQuestion("Enter the first number: ");
    } while (isNaN(num1) || num1.trim() === "");
    
    // Get second number
    do {
        num2 = await askQuestion("Enter the second number: ");
    } while (isNaN(num2) || num2.trim() === "");
    
    // Get operation
    do {
        operation = await askQuestion("Enter the operation (+, -, *, /): ");
    } while (!['+', '-', '*', '/'].includes(operation));
    
    return {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operation: operation
    };
}

// Function to perform the calculation
function calculate(num1, num2, operation) {
    switch (operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                throw new Error("Division by zero is not allowed!");
            }
            return num1 / num2;
        default:
            throw new Error("Invalid operation!");
    }
}

// Main function to run the calculator
async function runCalculator() {
    console.log("Welcome to the Simple Calculator!");
    console.log("==================================");
    
    try {
        // Get user input
        const input = await getUserInput();
        
        // Perform calculation
        const result = calculate(input.num1, input.num2, input.operation);
        
        // Display result
        console.log(`\nCalculation: ${input.num1} ${input.operation} ${input.num2} = ${result}`);
        
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        // Close the readline interface
        rl.close();
    }
}

// Run the calculator
runCalculator();
