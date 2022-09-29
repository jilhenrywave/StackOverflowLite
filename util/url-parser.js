/* eslint-disable implicit-arrow-linebreak */
module.exports = (req) =>
  String(
    Object.assign(new URL('http://a.com'), {
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl,
    }),
  );
