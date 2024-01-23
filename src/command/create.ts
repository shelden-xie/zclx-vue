/*
 * @Description: 
 * @Author: xieyadong
 * @Date: 2024-01-22 09:34:01
 * @LastEditTime: 2024-01-23 15:56:30
 * @LastEditors: xieyadong
 */

import path from 'path';
import fs from 'fs-extra';
import { input,select } from '@inquirer/prompts';
import { templates, TemplateInfo } from '../constants'
import { overWrite, clone,reWritePackage } from '../utils/files'
import logs from '../utils/log-tips';
import figlet from "figlet";

interface cmdOptions {
    force?:boolean;
}

const create = async (project?: string, cmd?: cmdOptions) => {
    // 初始化模板列表
    const templateList = [...templates.entries()].map(
        (item: [string, TemplateInfo]) => {
            const [name, info] = item;
            return {
                name,
                value: name,
                description: info.description,
            };
        },
    );
    // 检测是否输入项目名称
    if (!project) project = await input({ message: '请输入项目名称' });
    const description = await input({ message: '请输入项目描述' });

    const templatePath = path.join(process.cwd(), project) //替换path.resolve(__dirname, '../../');
    // 判断是否已经存在同名文件
    if (fs.pathExistsSync(templatePath)) {
        // 判断是否带有-f参数，直接删除已有同名项目
        if ((cmd as cmdOptions).force as boolean) {
            await fs.remove(templatePath)
        } else {
            let isOverwrite = await overWrite(project);
            if (isOverwrite) {
                await fs.remove(templatePath)
            } else {
                return false
            }
        }
    }
    
     // 选择具体模板
    const templateName = await select({
        message: '请选择需要初始化的模板:',
        choices: templateList,
    });
    const gitRepoInfo = templates.get(templateName) as TemplateInfo;

    if (!gitRepoInfo) return logs.error('模板不存在！')

    await clone(gitRepoInfo?.downloadUrl, project, ['-b', `${gitRepoInfo.branch}`]);
    
    await reWritePackage(templatePath, { name: project,description })
    figlet.defaults({ fontPath: "fonts" });
    console.log('\r\n' + figlet.textSync('ZCLX', {
        font: 'Ghost',
        horizontalLayout: 'full',
        verticalLayout: 'default',
        width: 800,
        whitespaceBreak: true
    }))
}

export default create;