const handler = (event, context, callback) => {
  const { GITHUB_PAT } = process.env;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ token: GITHUB_PAT })
  })
}

module.exports = {handler}