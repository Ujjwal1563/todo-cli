import fs from "fs"

import chalk from "chalk"

import { Command } from "commander"
import path from "path"


const program = new Command();

const filePath = path.join(process.cwd(),"todos.json");

program
    .command('add <task>')
    .description('Add a new Todo')