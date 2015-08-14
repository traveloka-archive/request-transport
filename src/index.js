import Domains from './router/Domains';
import Protocols from './router/Protocols';
import PageName from './pages/PageName';
import RequestType from './router/RequestType';
import Router from './router/TvRouter';
import Landing from './pages/Landing';
import FlightLanding from './pages/FlightLanding';

let router = new Router();
router.register(RequestType.GET, [Protocols.HTTPS], Domains.MOBILE_WEB, PageName.LANDING, '/', Landing);
router.register(RequestType.GET, [Protocols.HTTPS], Domains.MOBILE_WEB, PageName.FLIGHT_LANDING, '/flight', FlightLanding);
router.start(29099);