import * as express from "express"
import {pool} from "../postgres_db/connection"
import * as uniqid from "uniqid"
import * as jwt from "jsonwebtoken"
import {TokenData, DataInTokenJWT} from "../interfaces/token_interfaces"
import {User} from "../interfaces/user_interface"
import {createToken} from "../additional_functions/create_token"
import {createCookie} from "../additional_functions/create_cookie"



class AuthController{
	router = express.Router()
	path = "/auth"
	constructor(){
		this.initRoutes()
	}

	initRoutes(){
		this.router.post(`${this.path}/register`, this.register)
		this.router.post(`${this.path}/login`, this.login)
	}

	register(request: express.Request, response: express.Response){
		let userData:User = request.body.userData
		pool.query(`SELECT * FROM users WHERE email='${userData.email}'`).then(data=>{
			if(data.rows[0]){
				response.send("user already registed")
			}else{
				let id = uniqid()
				let email = userData.email
				let name = userData.name
				let password = userData.password 
			
				pool.query(`INSERT INTO users (id, email, name, password) VALUES
				 ('${id}', '${email}', '${name}', '${password}')` ).then(data=>{
				 	 response.send("user successful registed")
					})
			}
		})
	}

	login(request: express.Request, response: express.Response	){
		let userData:User = request.body.userData
		pool.query(`SELECT * FROM users WHERE email='${userData.email}'`).then(data=>{
			let user = data.rows[0]
			if(user){
				if(user.password == userData.password){
					let token = createToken(user)
					response.setHeader("Set-Cookie", createCookie(token))
					response.send("successful logging in")
					
				}else{
					response.send("wrong password")
				}
			}else{
				
				response.send(`user with email < ${userData.email} > doesnt exist`)
			}
		})

	}

}

export {AuthController}