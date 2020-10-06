/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
<<<<<<< HEAD
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
import * as defaultConfig from './config';
import { EuiCompilerPlugin } from './plugins/eui-compiler-plugin';
import { WebpackBundlePlugin } from './plugins/webpack-plugin';
const config: ResourceManagerConfig = {

    buildConfig: (params) => {
        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_android/assets/game`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new ManifestPlugin({ output: 'manifest.json' })
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    // new WebpackBundlePlugin({ libraryType: "debug", defines: { DEBUG: false, RELEASE: true } }),//新的 Webpack 编译器
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    new ManifestPlugin({ output: 'manifest.json' })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
=======
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin } from 'built-in';
import { BricksPlugin } from './bricks/bricks';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_android/assets/game`;
        return {
            outputDir,
            commands: [
                // new CompilePlugin({ libraryType: "debug", defines: { DEBUG: false, RELEASE: true } }),
                new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                new UglifyPlugin([{
                    sources: ["main.js"],
                    target: "main.min.js"
                }]),
                new ManifestPlugin({ output: 'manifest.json' })
            ]
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
