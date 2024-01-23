/*
 * @Description: 
 * @Author: xieyadong
 * @Date: 2024-01-22 11:40:15
 * @LastEditTime: 2024-01-23 17:03:22
 * @LastEditors: xieyadong
 */
import logs from './log-tips';
import { confirm } from '@inquirer/prompts';
import ora from 'ora';
import chalk from 'chalk';
import { simpleGit, SimpleGitOptions, SimpleGit } from 'simple-git';
import fs from 'fs-extra'
import path from 'path';
import { packageOption } from './types'
import figlet from "figlet";


// 是否覆盖文件目录
export const overWrite = async (fileName: string) => {
    logs.warning(`${fileName} 文件已经存！`);
    const isoverwrite = await confirm(
        { message: '是否覆盖原文件?' }
    );
    return isoverwrite
}

// 克隆文件模板
export const clone = async (url: string, name: string, options: string[]) => {
    const spinner = ora({
        text: '下载模板，在加速中哦~\n',
        spinner: {
            interval: 300,
            frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) =>
                chalk.blue(item),
            ),
        },
    });

    //simple-git配置
    const Options: Partial<SimpleGitOptions> = {
        baseDir: process.cwd(),
        binary: 'git',
        maxConcurrentProcesses: 6,
        trimmed: false,
    };
    const git: SimpleGit = simpleGit(Options);
    spinner.start();
    try {
        await git.clone(url, name, options)
        spinner.succeed();
        logs.success(`项目创建成功 ${chalk.blueBright(name)}`);
        console.log();
        logs.success(`执行以下命令启动项目：`);
        console.log();
        logs.info(` cd ${chalk.blueBright(name)} `);
        logs.info(` ${chalk.yellow('npm')} install `);
        logs.info(` ${chalk.yellow('npm')} run dev `);
    } catch (err: any) {
        spinner.stop();
        logs.error(String(err));
    }
}

// 重写packjson

export const reWritePackage = async (pathName: string, content: packageOption) => {
    const filePath = path.join(pathName, 'package.json');
    try {
        const data = await fs.readJsonSync(filePath, 'utf8');
        Object.assign(data,content)
        await fs.outputJsonSync(filePath, data, {
            spaces: 2,
            EOL: "\n",
        })
    } catch (error) {
        console.log(error)
    }
}

export const figletHelp = () => {
    let data = fs.readFileSync(path.join(__dirname,"..","fonts","Ghost.flf"), "utf8");
    figlet.parseFont("Ghost", data);
    console.log('\r\n' + figlet.textSync('ZCLX', {
        font: 'Ghost',
        horizontalLayout: 'full',
        verticalLayout: 'default',
        width: 800,
        whitespaceBreak: true
    }))
}