const { hashPassword, comparePassword } = require('./source')

;(async () => {
  const pwd = await hashPassword('pwd123')
  console.log(pwd)

  const compare1 = await comparePassword('pwd123', pwd)
  const compare2 = await comparePassword('pwd1234', pwd)
  const compare3 = await comparePassword('pwd1234555', pwd)
  const compare4 = await comparePassword('pwd123', pwd)

  console.log(compare1)
  console.log(compare2)
  console.log(compare3)
  console.log(compare4)
})()

