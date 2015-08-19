import Protocol from './const/Protocol';
import Request from './const/Request';
import PathPrefixRouter from './router/PathPrefixRouter';
import DomainRouter from './router/DomainRouter';
import Landing from './pages/Landing';
import FlightLanding from './pages/FlightLanding';
import WikiHome from './pages/WikiHome';

let domains = [
  { locale: 'id-id', domain: 'localhost:29099' },
  { locale: 'en', domain: 'localhost:29099/en' },
  { locale: 'en-id', domain: 'localhost:29099/en' },
  { locale: 'en-sg', domain: 'localhost:29099/en-sg' }
]
let page = {
  LANDING: 'LANDING',
  FLIGHT_LANDING: 'FLIGHT_LANDING'
};
let router = new PathPrefixRouter();
router.register(Request.GET, [Protocol.HTTP], domains, page.LANDING, '/', Landing);
router.register(Request.GET, [Protocol.HTTP], domains, page.FLIGHT_LANDING, '/flight', FlightLanding);
router.start(29099);

let domains2 = [
  { locale: 'en', domain: 'en.wikipedia.org' },
  { locale: 'id', domain: 'id.wikipedia.org' }
]
let router2 = new DomainRouter();
router2.register(Request.GET, [Protocol.HTTP], domains2, 'WIKI_HOME', '/', WikiHome);
router2.start(29098);

