// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as utils from './utils';
import { Uri } from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flying-redux-template" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('flying-redux-template.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from flying-redux-template!');
	// });

	// context.subscriptions.push(disposable);

	await utils.initTemplates(context);

	const registerCommand = (command: string, callback: (...args: any[]) => any, thisArg?: any) => {
		context.subscriptions.push(vscode.commands.registerCommand(command, callback, thisArg));
	};

	registerCommand("flying-redux-template.page", async (uri: Uri) => {
		if (!uri) {
			return 'Please open workspace folder';
		}

		try {
			vscode.window.showInputBox({
				ignoreFocusOut:true,
				placeHolder: "Please input page name",
				validateInput: async (name: string) => {
					var exists = await utils.ifExists(name, uri);
					return exists ? "Page Already Exists": null;
				},
			}).then(async (name: string | undefined) => {
				if(name) {
					await utils.generatePage(name, uri);
				}
			});
		} catch(error: any) {
			vscode.window.showErrorMessage(`Flying-Redux-Template: ${error?.message}`);
		}
	});

	registerCommand("flying-redux-template.component", async (uri: Uri) => {
		if (!uri) {
			return 'Please open workspace folder';
		}

		try {
			vscode.window.showInputBox({
				ignoreFocusOut:true,
				placeHolder: "Please input component name",
				validateInput: async (name: string) => {
					var exists = await utils.ifExists(name, uri);
					return exists ? "Component Already Exists": null;
				},
			}).then(async (name: string | undefined) => {
				if(name) {
					await utils.generateComponent(name, uri);
				}
			});
		} catch(error: any) {
			vscode.window.showErrorMessage(`Flying-Redux-Template: ${error?.message}`);
		}
	});

	registerCommand("flying-redux-template.example.todolist", async (uri: Uri) => {
		if (!uri) {
			return 'Please open workspace folder';
		}

		try {
			vscode.window.showInputBox({
				ignoreFocusOut:true,
				placeHolder: "Please input name",
				validateInput: async (name: string) => {
					var exists = await utils.ifExists(name, uri);
					return exists ? "Name Already Exists": null;
				},
			}).then(async (name: string | undefined) => {
				if(name) {
					await utils.generateToDoListExample(name, uri);
				}
			});
		} catch(error: any) {
			vscode.window.showErrorMessage(`Flying-Redux-Template: ${error?.message}`);
		}
	});
}


// This method is called when your extension is deactivated
export function deactivate() {}
