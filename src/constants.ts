/*
 * @Description: 
 * @Author: xieyadong
 * @Date: 2024-01-22 09:34:17
 * @LastEditTime: 2024-01-22 15:16:15
 * @LastEditors: xieyadong
 */

export interface TemplateInfo {
    name: string; // 项目名称
    downloadUrl: string; // 下载地址
    description: string; // 项目描述
    branch: string; // 项目分支
}

export const templates: Map<string, TemplateInfo> = new Map([
    [
        'v3-template+TS',
        {
            name: 'v3-template+TS',
            downloadUrl: 'https://github.com/shelden-xie/template-lists.git',
            description: 'vue3+TS开发模板',
            branch: 'main',
        },
    ],
    [
        'v3-template',
        {
            name: 'v3-template',
            downloadUrl: 'https://github.com/shelden-xie/template-lists.git',
            description: 'vue3开发模板',
            branch: 'dev',
        },
    ],
]);