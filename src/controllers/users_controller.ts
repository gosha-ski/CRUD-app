import * as express from "express"
import {pool} from "../postgres_db/connection"
import {authMiddleware} from "../middlewares/auth_middleware"
 
class UsersController {
	router = express.Router()
	path = "/users"
	constructor(){
		this.initRoutes()
	}

	initRoutes(){
		this.router.get(`${this.path}/:id`, this.getUserById)
	}

	getUserById(request: express.Request, response: express.Response){
		let id = request.params.id
		pool.query(`SELECT * FROM users WHERE id='${id}'`).then(data=>{
			let user = data.rows[0]
			response.send(user)
		})

	}
}

export {UsersController}