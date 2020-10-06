/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
<<<<<<< HEAD
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
import { BricksPlugin } from './bricks/bricks';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';
import { EuiCompilerPlugin } from './plugins/eui-compiler-plugin';
import { WebpackBundlePlugin } from './plugins/webpack-plugin';
=======
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin } from 'built-in';
import { BricksPlugin } from './bricks/bricks';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_bricks/PublicBrickEngineGame/Res`;
<<<<<<< HEAD
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new ManifestPlugin({ output: 'manifest.json' }),
                    new BricksPlugin()
                ]
            }
        }
        else if (command == 'publish') {
            console.log('执行publish')
            return {
                outputDir,
                commands: [
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    // new WebpackBundlePlugin({ libraryType: "debug", defines: { DEBUG: false, RELEASE: true } }),//新的 Webpack 编译器
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    // new EuiCompilerPlugin(),//新的 eui 编译器
                    new ManifestPlugin({ output: 'manifest.json' }),
                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "js/main.min.js"
                    }
                    ]),
                    new BricksPlugin(),
                ]
            }
        } else {
            throw `unknown command : ${params.command}`;
=======
        return {
            outputDir,
            commands: [
                new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                new ManifestPlugin({ output: 'manifest.json' }),
                new BricksPlugin()
            ]
>>>>>>> 03be62a2b3cc141c892a86154ef19146c7901884
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
