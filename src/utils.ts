import { fs } from 'mz';
import path = require('path');
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import config from './config';
import { PathLike } from 'mz/fs';
const inflect = require('i')(true);

export const initTemplates = async (context: vscode.ExtensionContext): Promise<void> => {
  await copyFolder(path.join(context.extensionPath, 'templates'), path.join(config.templatesPath), '');
};

const copyFolder = async (src: string, dest: string, name: string):Promise<void> => {
  let stats = await fs.stat(dest).catch(e => undefined);
  if (stats && !stats.isDirectory()) {
    throw Error('not folder');
  }

  if (!(await fs.exists(dest))) {
    await fs.mkdir(dest);
  }

  await Promise.all(
    (await fs.readdir(src)).map(async file => {
      let source = path.join(src, file);
      let target = path.join(dest, file);

      let stats = await fs.stat(source);

      if (stats.isDirectory()) {
        await copyFolder(source, target, name);
      } else if (stats.isFile()) {
        await copyFile(source, target);
        if (name.length > 0) {
          await replace(inflect.camelize(name), target);
        }
      }
    })
  );
};

const copyFile = (src: PathLike, dest: PathLike) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(src)
      .pipe(fs.createWriteStream(dest))
      .on('close', (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
  });
};

const replace = (target: string, path: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        let content = data.toString().replace(/\$name/g, target);
        fs.writeFile(path, content, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        });
      }
    });
  });
};

const getPathName = async (name: string, uri: Uri): Promise<string> => {
  let pathname = '';
  let stat = await fs.stat(uri.fsPath);
  if (stat.isDirectory()) {
    pathname = `${uri.fsPath}${path.sep}${name}`;
  } else {
    pathname = `${path.dirname(uri.fsPath)}${path.sep}${name}`;
  }
  return pathname;
};

export const ifExists = async (name: string, uri: vscode.Uri):Promise<boolean> => {
	var path = await getPathName(`${name}_component`, uri);
	return await fs.exists(path);
};

export const generateComponent = async (name: string, uri: vscode.Uri): Promise<void> => {
	var destPath = await getPathName(`${name}_component`, uri);
  var srcPath = config.componentTemplatesPath;
  await copyFolder(srcPath, destPath, name);
};


export const generatePage = async (name: string, uri: vscode.Uri): Promise<void> => {
	var destPath = await getPathName(`${name}_page`, uri);
  var srcPath = config.pageTemplatesPath;
  await copyFolder(srcPath, destPath, name);
  vscode.window.showInformationMessage(vscode.Uri.parse(destPath).fsPath);
  await generateComponent('sub', vscode.Uri.parse(destPath));
};
