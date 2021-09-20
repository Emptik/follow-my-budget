# Follow My Budget
Follow My Budget is a budget calculator, mostly built in javascript.<br/>
It enables you to add your incomes and expenses for the current month and show you the total amount and percentages.

*It is visible at this adress*:
- [Follow My Budget](https://follow-my-budget.netlify.app/)

## Table of Contents
- [Project setup](#setup)
- [Project](#project)
- [Useful links](#usefulLinks)

<!-- Setup -->
## <a id="setup">Project setup</a>
1. Download the project by using the command line<br/> 
**"git clone https://github.com/Emptik/follow-my-budget.git"** or download manually the .zip folder.
2. Install npm globally. A good solution on windows is to download the [nodeJs installer](https://nodejs.org/en/download/).<br/>
NPM is include with nodeJs. Then, inside the root project folder type the command line **"npm ci"**, to install necessary packages.
3. This project use webpack.<br/>
To start the development server, use **"npm run serve"**.

> **Note**: In the root folder you will see several configuration files like, ".eslintrc.js", ".stylelintrc.json".
They are useful for the configuration of the linters.<br/>
See the part [Useful links](#usefulLinks) down of this page.

<!-- Project -->
## <a id="project">Project</a>

### dist
The dist folder contains building files, ready to go on the server.

### src
The src folder contains all necessary files for the development of the application.

### global
This section contains files accessible throughout the application<br/>
They could have a role on several components at the same time.
> **Note**: The normalize or reset scss file goes in this folder.

### abstracts
This section contains all files that do not report directly to CSS selectors.<br/>
We will find mainly global variables, global mixins.

### base
The base file contain the base rules.<br/>
They define the default style of an element for all its appearances on the page.<br/>
However most of the parts of a website may change in the futur, so this file should stay minimalist.<br/>
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

### fonts
The fonts folder contains all the fonts necessary for the app ;)

### store
The store is a kind of "state management pattern".<br/>
It serves as a centralized data storage area for all components.

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
