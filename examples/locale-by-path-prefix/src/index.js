import { PathPrefixRouter as Router } from 'request-transport';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

let router = new Router('localhost:29099', ['en', 'id-id', 'en-id', 'en-sg'], 'id-id');
router.register('HOME', 'get', 'http', '/', Home);
router.register('SIGNUP', ['get', 'post'], ['http', 'https'], '/signup', Signup);
router.register('PROFILE', 'get', 'http', '/profile/:username', Profile);

router.start(29099);
