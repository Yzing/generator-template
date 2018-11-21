/**
 * Author: yanzhi
 * Date: 2018-11-20
 * Description: 单页面脚手架构建
 */
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('name', { 
            type: String, 
            default: 'msfe-project'
        });
    }
    async prompting() {
        this.answers = await this.prompt([{
            type: 'input',
            name: 'name',
            message: 'input your project name:',
            default: this.options.name,
        }, {
            type: 'confirm',
            name: 'isMobileApp',
            message: 'is your project running in mobile ?',
            default: true,
        }, {
            type: 'confirm',
            name: 'isUsePx2rem',
            message: 'do you want use px2rem ?',
            default: false,
            when: answers => answers.isMobileApp
        }, {
            type: 'input',
            name: 'pxOfPerRem',
            message: 'how much px do you want to being transformed from one rem:',
            default: 100,
            when: answers => answers.isUsePx2rem,
        }]);
    }

    writing() {
        this.projectPath = this.destinationPath(`${this.answers.name}`);
        this._writingPackageJSON();
        this._writingMeta();
        this._writingHtml();
        this._writingBuildDir();
        this._writingConfigDir();
        this._writingSrcDir();
        this._writingSrcDir();
        // this._writingStaticDir();
    }

    _writingPackageJSON() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath(`${this.projectPath}/package.json`),
            { 
                name: this.answers.name 
            }
        );
    }

    _writingMeta() {
        this.fs.copy(
            this.templatePath('(.*|*.md)'),
            this.destinationPath(`${this.projectPath}`),
        );
    }

    _writingHtml() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(`${this.projectPath}`),
            {
                name: this.answers.name
            }
        );
    }

    _writingBuildDir() {
        this.fs.copyTpl(
            this.templatePath('build'),
            this.destinationPath(`${this.projectPath}/build`),
            { 
                isUsePx2rem: this.answers.isUsePx2rem,
                pxOfPerRem: parseInt(this.answers.pxOfPerRem),
            }
        );
    }

    _writingConfigDir() {
        this.fs.copy(
            this.templatePath('config'),
            this.destinationPath(`${this.projectPath}/config`),
        );
    }

    _writingSrcDir() {
        this.fs.copy(
            this.templatePath('src'),
            this.destinationPath(`${this.projectPath}/src`),
            {
                deep: true,
                dot: true,
            }
        );
    }

    _writingStaticDir() {
        this.fs.copy(
            this.templatePath('static'),
            this.destinationPath(`${this.projectPath}/static`),
        );
    }
};
