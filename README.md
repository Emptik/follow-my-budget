# Follow My Budget
Follow My Budget is a budget calculator, mostly built in javascript.<br/>
It enables you to add your incomes and expenses for the current month and show you the total amount and percentages.<br/>
*It is visible at this adress*:
- [Follow My Budget](https://follow-my-budget.herokuapp.com/)

## Table of Contents
- [Project setup](#setup)
- [Project](#project)
- [Useful links](#usefulLinks)

<!-- Setup -->
## <a id="setup">Project setup</a>
1. Download the project by using the command line<br/> 
**"git clone https://github.com/Emptik/follow-my-budget.git"**<br/>
or the .zip folder.
2. Install npm globally. A good solution on windows is to download the [nodeJs installer](https://nodejs.org/en/download/).<br/>
NPM is include with nodeJs. Then, inside the root project folder type the command line **"npm ci"**.
3. Install [SASS](https://sass-lang.com/install) globally.<br/>
For doing that, type the command line **"npm install -g sass"**.<br/>
Then i recommend you to compile your scss files by typing the command line **"sass --watch src:dist/css"** in the root project.

> **Note**: In the root folder you will see several configuration files like,<br/>
".eslintrc.js", ".stylelintrc.json".
They are useful if you want to use some linters, that i recommend you to use.<br/>
See the part [Useful links](#usefulLinks) down of this page.

<!-- Project -->
## <a id="project">Project</a>

### dist
The dist folder contain your css files.

### src
The src folder contains all necessary files for the development of the application.

### abstracts
This section contains all files that do not report directly to CSS selectors.<br/>
We will find mainly global variables, global mixins.

### base
The base folder contain the base rules.<br/>
They define the default style of an element for all its appearances on the page.<br/>
Don't forget that most of the parts of a website may change in the futur, so use them sparingly.<br/>
A base file should stay minimalist.<br/>
Rules are the same as in ["SMACSS"](http://smacss.com/)

Allowed selectors are:
- Type selector (`input`)
- Selector list (`div, span`)
- Descendant combinator (`div span`)
- Child combinator (`ul > li`)
- Attribute selector (`input[type=text]`)
- Adjacent sibling combinator (`h2 + p`)
- Pseudo classes (`a:visited`)

Forbidden selectors:
- Class (`.className`)
- Id (`#idName`)

> **Note**: The normalize or reset scss file goes in this folder.

### components
This section contains only UI components<br/>
Each components have its own folder and each folder have a scss file and a JavaScript view file (If it's necessary).
Components are reusable, they are the modular parts of your design.<br/>
They have a single responsibility. They do not communicate with each other.

The BEM methodology is used for writing scss rules.<br/>
Nevertheless, some differences are to be noted. For that, read the section below.<br/>

The BEM syntax used for this project is as follow:
- `.blockName`
- `.blockName--modifierName`
- `.blockName__elementName`
- `.blockName__elementName--modifierName`

> **Note**: A modifier can never be alone on a single dom node. He is always attached to a block or to his element.<br/>
External geometry is not allowed on a block component (Prefer padding instead of margin), but is allowed on an element.<br/>
On this project, contrary to the recommendations of the BEM documentation,<br/>
it is not possible to have a block and an element on a single dom node.

I recommend you to use ESlint with the Airbnb config file. More information in the Useful links part below.

### fonts
The fonts folder contains all the fonts necessary for the app ;)

### store
The store is a kind of "state management pattern".<br/>
It serves as a centralized data storage area for all components.

### vendors
The vendors folder contains all external necessary tools like, "fontawesome" and "sass-mq".

<!-- Usefull Links -->
## <a id="usefulLinks">Useful links</a>
- [SMACSS documentation](http://smacss.com/)
- [BEM documentation](https://en.bem.info/methodology/quick-start/)

**Concerning the linters**:<br/>
If you use [vscode](https://code.visualstudio.com/), download and install extensions:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) by Dirk Baeumer
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) by Stylelint
(If you have followed the [Project setup](#setup) part, you don't need to install anything else).

**Linters's documentation**:<br/>
- [ESLint](https://eslint.org/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), configuration for ESlint
- [Stylelint](https://stylelint.io/)
