#request-transport
Locale Aware Nodejs Router

##Examples
```JavaScript
import { PathPrefixRouter as Router } from 'request-transport';
import Home from './pages/Home';
import Signup from './pages/Signup';

let router = new Router('localhost:29099', ['en', 'id-id', 'en-id', 'en-sg']);
router.register('HOME', 'get', 'http', '/', Home);
router.register('SIGNUP', ['get', 'post'], ['http', 'https'], '/signup', Signup);

router.start(29099);
```

##Try The Framework
```Shell
git clone git@github.com:traveloka/request-transport.git
cd request-transport/examples/locale-by-path-prefix
npm install
npm run build
node lib/index.js
```
*use sudo if setup failed

<a href="http://localhost:29099/en-id" target="_blank">Then open localhost:29099/en-id</a>
