exports.get404 = (req, res, next) => {
  res.status(404).json({
    message: '404 not found',
    status: 404,
  });
};

exports.get500 = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
  res.status(500).json({
    message: '500 error',
    status: 500,
  });
};
