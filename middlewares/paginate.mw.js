const {MAX_LIMIT} = require('../constsnts')

module.exports = async (req, res, next) => {
  try {
    const {
      query: { page, amount },
    } = req;
    const limit = (amount && amount>0 && amount<MAX_LIMIT) ? amount : MAX_LIMIT;
    const offset = (page && page>0) ? ((page- 1) * limit) : 0 ;
    req.pagination = {
      limit,
      offset,
    };
    next()
  } catch (error) {
    next(error)
  }
}