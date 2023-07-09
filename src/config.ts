import * as path from 'path';
import * as os from 'os';
const json = require('../package.json');

export class Config {
    public get templatesPath(): string {
        return path.join(os.homedir(), `.vscode${path.sep}flying-redux-templates_${json.version}`);
    }
    
    public get pageTemplatesPath(): string {
        return path.join(this.templatesPath, `${path.sep}page`);
    }

    public get componentTemplatesPath(): string {
        return path.join(this.templatesPath, `${path.sep}component`);
    }
} 

export default new Config();