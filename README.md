# AutoBuy.js
A simple node package that sends request to the autobuy.io API.

# Installation

```shell
npm install autobuy.js
```

# Usage
### Using .then()
```js
const { AutoBuyClient } = require('autobuy.js');
const autobuy = new AutoBuyClient('APIKEY');

autobuy.someMethod('parameters')
.then(result => console.log(result));
```
### Using async/await

```js
const { AutoBuyClient } = require('autobuy.js');
const autobuy = new AutoBuyClient('APIKEY');

(async() => {
    const result = await autobuy.someMethod('parameters')
    console.log(result);
})();
```

