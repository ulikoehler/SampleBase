var router = require('koa-router')();
const { exec } = require('child-process-promise');


router.get('/api/getnewid', async ctx => {
  console.log()
  const result = await exec('python3 samplebase/pythonScripts/MakeRandomIPv6Address.py')
  const ipv6 = result.stdout.toString().trim();
  console.log(ipv6)
  ctx.body = { status: 'ok', id: ipv6 };
})

module.exports = router


