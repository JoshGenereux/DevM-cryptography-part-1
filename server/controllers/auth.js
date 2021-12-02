const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && bcrypt.compare(password, users[i].passHash)) {
            const returnObj = {...users[i]}
            delete returnObj.passHash
            res.status(200).send(returnObj)
            console.log(returnObj)
        } else {
            res.status(400).send("User not found.")
        }
      }
    },
    register: (req, res) => {
        console.log('Registering User')
        const {username, email, firstName, lastName, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)

        const userObj = {
            username,
            email,
            firstName,
            lastName,
            passHash
        }

        users.push(userObj)
        res.status(200).send(req.body)
    }
}