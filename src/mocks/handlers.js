import { rest } from "msw"

const baseURL = "https://memovault-api-2cb24ac3e7ac.herokuapp.com/"


export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 4,
            "username": "nick",
            "email": "",
            "first_name": "",
            "last_name": "",
            "is_admin": false,
            "profile_id": 4,
            "profile_image": "https://res.cloudinary.com/dqns11w6z/image/upload/v1/media/images/butterfly_xq6i90"
            }))
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200))
    })
]