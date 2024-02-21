import {Request, Response, NextFunction} from "express"
import * as jwt from "jsonwebtoken"
import {pool} from "../postgres_db/connection"
import {TokenData, DataInTokenJWT} from "../interfaces/token_interfaces"


function authMiddleware(request: Request, response: Response, next: NextFunction){
	let token = request.headers.authtoken
	if(typeof token == "string"){
		let data = jwt.verify(token, "SECRET_KEY") as DataInTokenJWT
		pool.query(`SELECT * FROM users WHERE id='${data.user_id}'`).then(data=>{
			let user = data.rows[0]
			if(user){
				next()
			}else{
				response.send("Authentication middleware error")
			}
		})
	}else{
		response.send("Authentication middleware error")
	}
}

export {authMiddleware}