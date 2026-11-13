import { mkdir, cp, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'style.css', 'game.js', 'vendor', '_headers']) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
for (const file of ['index.html', 'style.css', 'game.js', 'vendor/three.min.js']) {
  if (!(await stat(path.join(output, file))).size) throw new Error(`发布文件为空：${file}`);
}
console.log('发布文件已生成：dist/');
