#request-transport
Locale Aware Nodejs Router

##Examples
```JavaScript
let router = new Router();
router.register('localhost:29099', ['en', 'id-id', 'en-id', 'en-sg'], 'id-id', path => {
  path.register('HOME', 'get', 'http', '/', Home);
  path.register('SIGNUP', ['get', 'post'], ['http', 'https'], '/signup', Signup);
  path.register('PROFILE', 'get', 'http', '/profile/:username', Profile);
});
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
