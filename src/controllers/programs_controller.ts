import * as express from "express"
import {authMiddleware} from "../middlewares/auth_middleware"
import {pool} from "../postgres_db/connection"
import * as uniqid from "uniqid"
import * as jwt from "jsonwebtoken"
import {TokenData, DataInTokenJWT} from "../interfaces/token_interfaces"
 
class ProgramsController {
	router = express.Router()
	path = "/programs"
	constructor(){
		this.initRoutes()
	}

	initRoutes(){
		this.router.get(this.path, this.getAllPrograms)
		this.router.get(`${this.path}/:id`, this.getProgramById)
		this.router.post(this.path, authMiddleware, this.createProgram)
		this.router.post(`${this.path}/:id`, authMiddleware, this.subscribeProgramById)

	}

	getProgramById(request: express.Request, response: express.Response){
		let program_id = request.params.id
		pool.query(`SELECT * FROM programs WHERE id='${program_id}'`).then(data=>{
			response.send(data.rows[0])
		})

	}

	getAllPrograms(request: express.Request, response: express.Response){
		let page = Number(request.query.page)-1
		pool.query(`SELECT * FROM programs LIMIT 1	 OFFSET ${page*1}`).then(data=>{
			response.send(data.rows)
		})
	}

	createProgram(request: express.Request, response: express.Response){
		let data = request.body.programData
		let title = data.title
		let description = data.description
		let token = request.headers.authtoken as string
		let dataInToken: DataInTokenJWT = jwt.verify(token, "SECRET_KEY") as DataInTokenJWT	
		let owner = dataInToken.user_id
		pool.query(`INSERT INTO programs (id, title, description, owner) 
			VALUES ('${uniqid()}', '${title}', '${description}', '${owner}')`).then(data=>{
				response.send("program succeful created")
			})

	}

	subscribeProgramById(request: express.Request, response: express.Response){
		console.log("Subscribe method")
		let program_id = request.params.id
		let token = request.headers.authtoken as string
		let dataInToken: DataInTokenJWT = jwt.verify(token, "SECRET_KEY") as DataInTokenJWT	
		let user_id = dataInToken.user_id

		pool.query(`SELECT * FROM subscriptions 
			WHERE program_id='${program_id}' AND user_id='${user_id}'`).then(data=>{
				if(data.rows[0]){
					response.send("WARN! you have alredy subscribed")
				}else{
					pool.query(`INSERT INTO subscriptions (program_id, user_id) 
						VALUES ('${program_id}', '${user_id}')`).then(data=>{
							response.send("you succeful subscribed")
						})
					}
		})
	}

}

export {ProgramsController}