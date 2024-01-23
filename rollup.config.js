/**
 * @rollup/plugin-node-resolve：支持rollup打包node.js模块
 *  @rollup/plugin-commonjs：支持rollup打包commonjs模块
 *  @rollup/plugin-json：支持rollup打包json文件
 * rollup-plugin-typescript2：支持rollup打包ts文件
 * @rollup/plugin-terser：压缩打包代码
 * rollup-plugin-node-externals：使rollup自动识别外部依赖
 */

import { defineConfig } from "rollup";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from 'rollup-plugin-typescript2';

export default defineConfig([
  {
    input: {
      index: "src/index.ts",
    }, // 入口
    output: [
      {
        dir: "dist", // 输出目标文件夹
        format: "cjs", // 输出 commonjs 文件
      },
    ],
    external: [], // 外部依赖的配置
    plugins: [
      commonjs(),
      resolve(),
      typescript(),
      json(),
      terser(),
    ], // 各种插件使用的配置
  },
]);
