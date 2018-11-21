### 介绍
- 该工具是基于 yeoman 的一个脚手架构建工具，在使用前，需要全局安装；
由于本项目在 http://npm.mfwdev.com 私有 npm 仓库发布，安装时需要指定 registry
```
sudo npm i -g yo

sudo npm i -g generator-msfe --registry http://npm.mfwdev.com

yo msfe
```

- 不想全局安装的同学也可以从 gitlab 克隆到本地
```
git clone ssh://git@ssh.gitlab.mfwdev.com:333/yanzhi/generator-msfe.git

cd generator-msfe

npm ln

cd ${your-dir}

yo msfe
```

### 模板
- 目前只支持但页面模板，使用以下命令可以快速选择模板
```
yo msfe:spa ${your-project-name}
```
