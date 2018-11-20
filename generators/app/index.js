var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('spa', {
            type: Boolean,
            desc: 'Use the single page template to init your project',
        });
        this.templateList = ['spa'];
    }

    async prompting() {
        const templateList = this.templateList;
        for (let v of templateList) {
            if (v in this.options && this.options[v]) {
                this.template = v;
                return;
            }
        }
        const promptList = [{
            type: 'list',
            name: 'template',
            message: 'which template do you like to init your project ?',
            choices: templateList
        }];
        this.anwsers = await this.prompt(promptList);
        this.template = this.anwsers.template;
    }


    default() {
        this.spawnCommandSync('yo', [`msfe:${this.template}`], {
            stdio: 'inherit'
        });
    }
};
