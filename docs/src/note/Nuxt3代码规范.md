在Nuxt3中官方推出了一个一体化ESLint集成包，它生成一个项目感知的ESLint平面配置，并提供可选地与开发服务器一起运行ESLint检查的能力。该模块是为[新的Eslint Flat Config Format](https://eslint.org/docs/latest/use/configure/configuration-files-new)设计的，该格式是[ESLINT V9以来的默认格式](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/)。

当然你如果想要使用旧版本的ESLint，则需要使用[`@nuxt/eslint-config`](https://eslint.nuxt.com/packages/config)进行手动配置。

## ESLint+Prettier安装解决代码规范

### 添加`@nuxt/eslint`模块

```sh
npx nuxi module add eslint
```

添加完成后将生成`eslint.config.mjs`文件

### 添加Typescript(可选)

如果使用了Typescript，则需要安装`typescript`

```sh
pnpm add typescript -D
```

### 添加命令

往package.json添加以下代码

```json
{
  "scripts": {
    ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    ...
  },
}
```

运行`npm run lint`检查代码或运行`npm run lint:fix`以自动解决问题

默认情况下，该模块不会启用风格/格式规则，你可以使用`Prettier`

### Prettier

首先需要安装Prettier以及相关插件

```sh
pnpm add prettier eslint-plugin-prettier eslint-config-prettier -D
```

其中 `eslint-plugin-prettie` 和 `eslint-config-prettier` 是什么呢

`eslint-plugin-prettie`插件是为了使用`Prettier`应用到`Eslint`来格式化代码

`eslint-config-prettier`插件是为了解决`Eslint`和`Prettier`的冲突，使代码格式化规则保持一致

### 使用Prettier

修改`eslint.config.mjs`文件，解决与Eslint冲突问题
```js
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	plugins: {
		prettier: prettierPlugin,
	},
	rules: {
		'prettier/prettier': 'error', // 启用 Prettier 规则检测
		...prettierConfig.rules, // 确保 Prettier 规则生效
	},
});
```

配置Prettier规则

```js
export default {
	semi: true,//强制在语句的末尾添加分号（;）。
	singleQuote: true,//使用单引号（'）而不是双引号（"）来包裹字符串。
	tabWidth: 2,//设置每个缩进级别的空格数。这里的2意味着每次缩进将使用 2 个空格。
	//设置是否在多行对象或数组的末尾加上逗号（,)。'es5' 表示只有在 ECMAScript 5（ES5）兼容的语法中（如对象、数组）才会加上逗号。
	trailingComma: 'es5',
	printWidth: 80,//设置每行代码的最大宽度。超过这个宽度时，Prettier 会自动换行。
};
```

### 测试
使用`pnpm run lint:fix`测试是否可以成功使用

如果发现保存文件和命令`pnpm run lint:fix`发生冲突，则需要设置：
==编译器的格式化工具为Prettier==

## Husky+lint-staged解决git commit 代码语法检查

### Husky

在提交或推送时，自动化 **检查提交信息**、**检查代码** 和 **运行测试**。

1. 安装

```sh
pnpm add husky -D
```

2. 初始化

它会在 `.husky/` 中创建 `pre-commit` 脚本，并更新 `package.json` 中的 `prepare` 脚本。随后可根据你的工作流进行修改。

```sh
pnpm exec husky init
```

3. 试一试

```sh
git commit -m "Keep calm and commit"
# 测试脚本会在每次提交时运行
```

### lint-staged

只对**暂存区**（staged）的代码运行 lint 规则，而不是整个项目，提高速度，防止格式错误、不符合代码规范的代码提交到仓库，与 husky 结合，在 pre-commit 阶段强制代码检查。

1. 安装

```sh
pnpm add lint-staged -D
```

2. 在`.husky/pre-commit`中修改钩子命令

```bash
pnpm exec lint-staged
```

3. 在根目录下新建`.lintstagedrc`文件或在`package.json`添加配置

```json
// .lintstagedrc
{
//"lint-staged": { 在package.json 中需要包裹这层
   "*.{js,jsx,vue,ts,tsx}": [
     "eslint --fix",
     "prettier --write"
   ]
//}
}
```

4. 测试

修改一个 js 或 vue 文件，git add 后执行：

```bash
git commit -m "fix: 测试 lint-staged"
```

如果代码格式不符合 eslint 或 prettier 规范，lint-staged 会自动修复并提交。

## Commitlint 解决commit提交规范

上述配置只对commit之前的代码进行检查修复，如果我们需要规范一下`git commit -m`的内容的话，就需要用到`Commitlint`。

1. 安装
安装`@commitlint/cli`和 `@commitlint/config-conventional`

- @commitlint/cli 是 commitlint 的核心工具。
- @commitlint/config-conventional 是预定义的 **Conventional Commits** 配置，提供了一些常见的规则。

```bash
pnpm add --save-dev @commitlint/{cli,config-conventional}
```
 
 2. 创建脚本

```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "pnpm commitlint \${1}" > .husky/commit-msg
```

这将在`.husky`目录下新建commit-msg，并添加`pnpm commitlint ${1}`,并在package.json的script添加脚本命令

3. 创建commit规则，根目录下新建文件`commitlint.config.cjs`

```js
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			// type枚举
			2,
			'always',
			[
			'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
			'feat', // 新功能
			'fix', // 修补bug
			'docs', // 文档修改
			'style', // 代码格式修改, 注意不是 css 修改
			'refactor', // 重构
			'perf', // 优化相关，比如提升性能、体验
			'test', // 测试用例修改
			'revert', // 代码回滚
			'ci', // 持续集成修改
			'config', // 配置修改
			'chore', // 其他改动
			],
		],
		'type-empty': [2, 'never'], // never: type不能为空; always: type必须为空
		'type-case': [0, 'always', 'lower-case'], // type必须小写，upper-case大写，camel-case小驼峰，kebab-case短横线，pascal-case大驼峰，等等
		'scope-empty': [0],
		'scope-case': [0],
		'subject-empty': [2, 'never'], // subject不能为空
		'subject-case': [0],
		'subject-full-stop': [0, 'never', '.'], // subject以.为结束标记
		'header-max-length': [2, 'always', 72], // header最长72
		'body-leading-blank': [0], // body换行
		'footer-leading-blank': [0, 'always'], // footer以空行开头
	},
};
```

4. 测试一下

```bash
npx commitlint --from HEAD~1 --to HEAD --verbose
```

这将检查您的最后一个提交，并返回错误，如果有效，如果有效，则输出的错误。