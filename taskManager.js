const fs = require('fs');
const readline = require('readline');

// Set up readline for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// File to store tasks
const TASKS_FILE = 'tasks.json';

// Load tasks from file or initialize an empty array
let tasks = [];
if (fs.existsSync(TASKS_FILE)) {
  const data = fs.readFileSync(TASKS_FILE);
  tasks = JSON.parse(data);
}

// Function to save tasks to file
function saveTasks() {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Function to display menu
function showMenu() {
  console.log('\n=== Task Manager ===');
  console.log('1. List all tasks');
  console.log('2. Add a new task');
  console.log('3. Delete a task');
  console.log('4. Exit');
  rl.question('Choose an option (1-4): ', handleMenu);
}

// Function to handle menu options
function handleMenu(option) {
  switch (option.trim()) {
    case '1':
      // List all tasks
      if (tasks.length === 0) {
        console.log('No tasks found.');
      } else {
        console.log('\nYour Tasks:');
        tasks.forEach((task, index) => {
          console.log(`${index + 1}. ${task}`);
        });
      }
      showMenu();
      break;

    case '2':
      // Add a new task
      rl.question('Enter a new task: ', (task) => {
        if (task.trim()) {
          tasks.push(task.trim());
          saveTasks();
          console.log('Task added successfully!');
        } else {
          console.log('Task cannot be empty.');
        }
        showMenu();
      });
      break;

    case '3':
      // Delete a task
      if (tasks.length === 0) {
        console.log('No tasks to delete.');
        showMenu();
      } else {
        console.log('\nYour Tasks:');
        tasks.forEach((task, index) => {
          console.log(`${index + 1}. ${task}`);
        });
        rl.question('Enter the task number to delete: ', (index) => {
          const taskIndex = parseInt(index) - 1;
          if (taskIndex >= 0 && taskIndex < tasks.length) {
            const deletedTask = tasks.splice(taskIndex, 1);
            saveTasks();
            console.log(`Task "${deletedTask}" deleted successfully!`);
          } else {
            console.log('Invalid task number.');
          }
          showMenu();
        });
      }
      break;

    case '4':
      // Exit
      console.log('Goodbye! Thanks for using Task Manager.');
      rl.close();
      break;

    default:
      console.log('Invalid option. Please choose 1-4.');
      showMenu();
      break;
  }
}

// Start the program
console.log('Welcome to the Task Manager CLI!');
showMenu();
