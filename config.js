
var secrets;
try {
  secrets = require('./secrets.json')
} catch (e) {
  console.error('Create your own secrets file lazybones');
  secrets = require('./secret-sample.json');
}

exports.PORT = process.env.PORT || 8080
exports.DATABASE_URL =
  (process.env.DATABASE_URL ||
    ('postgres://' +
      secrets.DB_USER +
      ":" + secrets.DB_PASSWORD +
      "@" + secrets.DB_HOST +
      ":5432/" + secrets.DATABASE
    )
  );
