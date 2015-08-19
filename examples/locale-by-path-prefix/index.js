import { PathPrefixRouter as Router } from 'request-transport';
import Home from './pages/Home';

let router = new Router([
  { locale: 'en', domain: 'en.wikipedia.org' },
  { locale: 'id', domain: 'id.wikipedia.org' }
]);
router.register('HOME', 'get', 'http', '/', Home);

router.start(29099);