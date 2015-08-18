import Domains from './const/Domains';
import Protocols from './const/Protocols';
import PageName from './const/PageName';
import RequestType from './const/RequestType';
import Router from './router/PathPrefixRouter';
import Landing from './pages/Landing';
import FlightLanding from './pages/FlightLanding';

let router = new Router();
router.register(RequestType.GET, [Protocols.HTTPS], Domains.MOBILE_WEB, PageName.LANDING, '/', Landing);
router.register(RequestType.GET, [Protocols.HTTPS], Domains.MOBILE_WEB, PageName.FLIGHT_LANDING, '/flight', FlightLanding);
router.start(29099);