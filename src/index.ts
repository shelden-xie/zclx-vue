/*
 * @Description: const 
 * @Author: xieyadong
 * @Date: 2024-01-19 15:43:35
 * @LastEditTime: 2024-01-23 17:06:22
 * @LastEditors: xieyadong
 */
import { Command } from 'commander';
import * as packages from '../package.json';
import chalk from 'chalk'
import create from './command/create'
import {figletHelp} from './utils/files'


const program = new Command('zclx');

// 创建zclx命令
program.name('zclx')
    .usage(`<command> [option]`)
    .version(`${packages.version}`)

// 添加创建脚手架命令
program.command("create")
    .description('create a new project')
    .argument('[name]', '项目名称')
    .option("-f, --force", "overwrite target directory if it exists")
    .action((projectName, cmd) => {
        create(projectName, cmd)
    })

// 创建帮助提示，添加颜色提示
program.on("--help", function () {
    console.log();
    console.log(
        'Run  '+ chalk.green("zclx <command> --help")+'  for detailed usage of given command.'
    );
    figletHelp();
    console.log();
});

program.parse(process.argv);

