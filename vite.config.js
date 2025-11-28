import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

function getHtmlFiles(dir = './') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  
  // Skip these directories
  const skipDirs = ['node_modules', '.git', 'dist', 'public', 'src'];

  for (const entry of entries) {
    if (entry.isDirectory() && skipDirs.includes(entry.name)) {
      continue;
    }
    
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

const htmlInputMap = {};
getHtmlFiles('./').forEach((file) => {
  const name = file
    .replace(/^\.\/|\.html$/g, '') 
    .replace(/\//g, '_'); 
  htmlInputMap[name] = file;
});

export default defineConfig({
  base: './',
  build: {
    target: 'esnext', 
    rollupOptions: {
        input: htmlInputMap
    }
  }
});
