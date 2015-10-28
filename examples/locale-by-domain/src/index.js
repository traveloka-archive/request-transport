import { DomainRouter as Router } from 'request-transport';
import Home from './pages/Home';

let router = new Router();
let domains = [
  { locale: 'en', domain: 'en.wikipedia.org' },
  { locale: 'id', domain: 'id.wikipedia.org' }
];
router.register(domains, route => {
  route('HOME', 'get', 'http', '/', Home);
});

router.start(29099);
