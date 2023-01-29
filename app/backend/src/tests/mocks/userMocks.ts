import { IUser } from '../../interfaces/User'

const user: IUser = {
  id: 1,
  username: 'user',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const unecryptPass = 'secret_user';

const payload = {
  userId: 2,
  iat: 1675033791,
  exp: 1675055391
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3NTAzMzc5MSwiZXhwIjoxNjc1MDU1MzkxfQ.ff8g2K5nb9FM8Pjl6MBCSJijzi6YyY8IGuZXX4lVuuE"

export { user, token, unecryptPass, payload };