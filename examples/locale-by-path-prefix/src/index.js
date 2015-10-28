import { PathPrefixRouter as Router } from 'request-transport';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

let router = new Router();
router.register('localhost:29099', ['en', 'id-id', 'en-id', 'en-sg'], 'id-id', path => {
  path.register('HOME', 'get', 'http', '/', Home);
  path.register('SIGNUP', ['get', 'post'], ['http', 'https'], '/signup', Signup);
  path.register('PROFILE', 'get', 'http', '/profile/:username', Profile);
});

router.start(29099);
