# Follow My Budget
*Follow My Budget is a budget calculator, mostly built in javascript. It is visible at this adress*:
- [Follow My Budget](https://follow-my-budget.herokuapp.com/)

> **Note**: Follow My Budget enables you to add your incomes and expenses for the current month<br>
and show you the total amount and percentages.

## Table of Contents
- [Project setup](#setup)
- [Scss methodology](#scssMethodology)
- [Scss folders](#scssFolders)
- [Javascript](#javascript)
- [Useful links](#usefulLinks)

## <a id="setup">Project setup</a>
1. Download the project by using the command line<br/> 
**"git clone https://github.com/Emptik/follow-my-budget.git"**<br/>
or the .zip folder.
2. Install npm globally. A good solution on windows is to download the [nodeJs installer](https://nodejs.org/en/download/).<br/>
NPM is include with nodeJs. Then, inside the root project folder type the command line **"npm ci"**.
3. Install composer globally, a good solution on windows is to download the [composer installer](https://getcomposer.org/download/).<br/>
Then inside the root project folder type the command line **"composer update"**.
4. Install [SASS](https://sass-lang.com/install) globally.<br/>
For doing that, type the command line **"npm install -g sass"**.<br/>
Then i recommend you to compile your scss files by typing the command line **"sass --watch sass:css"** inside the public folder of the project.

> **Note**: In the root folder you will see several configuration files like,<br/>
".eslintrc.js", ".stylelintrc.json".
They are useful if you want to use some linters, that i recommend you to use.<br/>
See the part [Useful links](#usefulLinks) down of this page.

## <a id="scssMethodology">Scss methodology</a>
> **Note**: I followed the BEM methodology for writing scss rules.<br/>
Nevertheless, some differences are to be noted. For that, read the section below.

As i said, components and layout rules are written with the BEM syntax.<br/>
Please, use "camelCase" when you write your class name.

The syntax used for this project is as follow:
- `.blockName`
- `.blockName--modifierName`
- `.blockName__elementName`
- `.blockName__elementName--modifierName`

> **Note**: A modifier can never be alone on a single dom node. He is always attached to a block or to his element.<br/>
External geometry is not allowed on a block component (Prefer padding instead of margin), but is allowed on his element.
However, it is possible to use some external geometry on a block, if this one is a part of the layout.

On this project, contrary to the recommendations of the BEM documentation,<br/>
it is not possible to have a block and an element on a single dom node.

**Exemple**:

```
<div class="c-header">
    <div class="c-searchForm c-header__searchForm"></div>
</div>
```

> **Note**: In BEM, this is called a [mix](https://en.bem.info/methodology/css/#mixes) but it's not allowed on this project.

**Instead prefer**:

```
<div class="c-header">
    <div class="c-header__searchForm">
        <div class="c-searchForm"></div>
    </div>
</div>
```

> **Note**: Use a prefix before your class name, like "c-" if it is a component or l- for a layout rule.

## <a id="scssFolders">Scss folders</a>
> **Note**: Scss files are organized inside folders with a SMACSS logical storage.<br/>
Nevertheless, some differences are to be noted. For that, read the section below.

### Base
The base folder contain the base rules.<br/>
They define the default style of an element for all its appearances on the page.<br/>
Don't forget that most of the parts of a website may change in the futur, so use them sparingly.<br/>
A base file should stay minimalist.

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

### Layout
The layout folder contain the layout rules.<br/>
They divide the page in different section.<br/>
They hold one or several components together.<br/>
They are never include inside the components. They encapsulate them.<br/>
Use the prefix (`l-`) follow by the name of your class to indicate that this is a layout rule.

The only one selector allowed:
- Class selector (`.l-header`)

> **Note**: Contrary to the SMACSS documentation, it is not possible to use an ID selector to target an dom element<br/>
if you wish to add some layout rules.

### Components
The component rules are reusable, they are the modular parts of your design.<br/>
This is the biggest part of your scss rules.<br/>
Use the prefix (`c-`) follow by the name of your class to indicate that this is a component rule.

The only one selector allowed:
- Class selector (`.c-form`)

### State
The state folder doesn't exist in this project<br/>
The BEM modifiers are in charge of this role.

## <a id="javascript">Javascript</a>
Javascript is used on the front-end side with an MVC approach. The latest JS syntax is allowed.<br/>
Controllers are listed in a single file.<br/>
Classes are present for the view part. Each class correspond to a component.<br/>
I recommend you to use ESlint with the Airbnb config file. More information in the Useful links part below.

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
