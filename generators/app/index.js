var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        // this.argument('name', { type: String, required: true });
    }
    async prompting() {
        this.answers = await this.prompt([{
            type: 'input',
            name: 'name',
            message: 'input your project name:',
            default: this.options.name,
        }])
    }

    writing() {
        const projectPath = this.destinationPath(`${this.options.name}`);
        if (this.fs.exists(projectPath)) {
            this.spawnCommandSync(`cd ${projectPath} && ls`);
            return;
            // throw new Error('the directory is exists');
        }
        this.fs.copyTpl(
            this.templatePath('*'),
            this.destinationPath(`${this.options.name}`),
            { title: this.answers.name },
        );
    }
};
