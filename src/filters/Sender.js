import Filter from '../core/Filter';

class Sender extends Filter {
  onFilter(req, res) {
    res.send(req.responseBody);
  }
}

export default Sender;
