import PageName from './pages/PageName';
import RequestType from './router/RequestType';
import Router from './router/TvRouter';
import Landing from './pages/Landing';
import FlightLanding from './pages/FlightLanding';

let router = new Router();
router.register(RequestType.GET, PageName.LANDING, '/', Landing);
router.register(RequestType.GET, PageName.FLIGHT_LANDING, '/flight', FlightLanding);
router.start(29099);