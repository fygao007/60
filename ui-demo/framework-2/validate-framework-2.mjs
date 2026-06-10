import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const htmlFiles = fs.readdirSync(directory)
  .filter((name) => name.endsWith('.html'))
  .sort();
const errors = [];

function addError(file, message) {
  errors.push(`${file}: ${message}`);
}

for (const file of htmlFiles) {
  const source = fs.readFileSync(path.join(directory, file), 'utf8');
  const usesFramework = source.includes('WiseFramework2.mount(')
    || source.includes('WiseAppShellV2.init(');

  if (!usesFramework) continue;

  if (source.includes('WiseAppShellV2.init(')) {
    addError(file, '禁止直接调用 WiseAppShellV2.init()');
  }

  if (!source.includes('src="./framework-2.js"')) {
    addError(file, '缺少 framework-2.js');
  }

  if (!source.includes('class="frame2-stage')) {
    addError(file, '缺少 .frame2-stage 根节点');
  }

  const styleBlocks = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  styleBlocks.forEach((match) => {
    if (/\.frame2-[\w-]+/.test(match[1])) {
      addError(file, '业务样式禁止覆盖 .frame2-* 核心类');
    }
  });

  const inlineScripts = [...source.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  inlineScripts.forEach((match, index) => {
    try {
      new vm.Script(match[1], { filename: `${file}:inline-${index + 1}.js` });
    } catch (error) {
      addError(file, `内联脚本语法错误：${error.message}`);
    }
  });
}

if (errors.length) {
  console.error(`框架2校验失败，共 ${errors.length} 项：`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`框架2校验通过：${htmlFiles.length} 个 HTML 文件，未发现核心样式覆盖或旧初始化方式。`);
}
