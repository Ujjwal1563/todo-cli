import fs from "fs"

import chalk from "chalk"

import { Command } from "commander"
import path from "path"


const program = new Command();

const filePath = path.join(process.cwd(),"todos.json");

function readTodos (){
    if(!fs.existsSync(filePath)){
        return [];
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function writeTodos(todos){
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), "utf8");
}

program
    .command('add <task>')
    .description('Add a new Todo')
    .action((task) =>{
        const todos= readTodos();
        todos.push({task, done:false});
        writeTodos(todos);
        console.log(chalk.green("Todo added successfully!"));
    });

program
    .command('delete <task>')
    .description('Delete a task by its index')
    .action((task)=>{
        const todos= readTodos();
        if(index>=1 && index<=todos.length){
            todos.splice(index-1,1);
            writeTodos(todos);
            console.log(chalk.red("Todo deleted successfully"));
        }
        else {
            console.log(chalk.yellow("Invalid index!"));
        }
    });

program
    .command("done <task>")
    .description("Mark a todo as done")
    .action((index)=>{
        const todos=readTodos();
        if(index>=1 && index <= todos.length){
            todos[index-1].done=true;
            writeTodos(todos);
            console.log(chalk.blue('Todo Marked as done!'));
        }
        else {
            console.log(chalk.yellow('Invalid index!'));
        }
    });

program
    .command('list')
    .description('list all todos')
    .action(()=>{
        const todos= readTodos();
        if(todos.length==0){
            console.log(chalk.magenta('No todos found!'));
        }
        else {
            todos.forEach((todo, index) => {
                const status = todo.done?chalk.green("[Done]")
                :chalk.red("[Pending]");
                console.log(`${index+1}. ${status} ${todo.task}`);
            });
        }
    });

program.parse(process.argv);