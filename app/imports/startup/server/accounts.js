import { Accounts } from 'meteor/accounts-base'

if(!Accounts.findUserByUsername('test1')) {
  Accounts.createUser({
    username: 'test1',
    email: 'test1@test.com',
    password: 'ilovemeteor',
    profile: {
      firstName: 'Testy',
      lastName: 'Zesty'
    }
  })
}

if(!Accounts.findUserByUsername('test2')) {
  Accounts.createUser({
    username: 'test2',
    email: 'test2@test.com',
    password: 'ilovemeteor',
    profile: {
      firstName: 'Torkey',
      lastName: 'Forkey'
    }
  })
}

if(!Accounts.findUserByUsername('customerservice')) {
  Accounts.createUser({
    username: 'customerservice',
    email: 'customerservice@mycorp.com',
    password: 'ilovemeteor'
  })
}
