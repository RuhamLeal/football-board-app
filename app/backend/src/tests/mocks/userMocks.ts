import { IUser } from '../../interfaces/User'

const user: IUser = {
  id: 1,
  username: 'user',
  role: 'customer',
  email: 'user@mail.com',
  password: 'FGDG34!#SAS213',
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6ImN1c3RvbWVyIiwiZW1haWwiOiJ1c2VyQG1haWwuY29tIiwicGFzc3dvcmQiOiJGR0RHMzQhI1NBUzIxMyJ9.iY87js6kfhJ6vMlxNBA-q8jDm3wQV_98J8dMbaHY7Zs"

export { user, token };