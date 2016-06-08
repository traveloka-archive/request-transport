import { PathPrefixRouter as Router } from '../../src';
import HomePage from './HomePage.js';
import RegisterPage from './RegisterPage';

const router = new Router('localhost', ['en', 'id-id', 'en-id', 'en-sg'], 'id-id');
router.register('localhost', ['en', 'id-id', 'en-id', 'en-sg'], 'id-id', route => {
  route('HOME', 'get', 'http', '/', HomePage);
  route('REGISTER', 'get', 'http', '/register', RegisterPage);
});

router.start(3000, () => {
  console.log('Started at port 3000');
});
