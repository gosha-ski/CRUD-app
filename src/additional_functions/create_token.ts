import * as jwt from "jsonwebtoken"
import {TokenData, DataInTokenJWT} from "../interfaces/token_interfaces"
import {User} from "../interfaces/user_interface"

function createToken(user:User): TokenData{
	let expiresIn = 3600
	let secretKey = "SECRET_KEY"
	let dataInToken: DataInTokenJWT = {
		user_id: user.id
	}
	return {
		token: jwt.sign(dataInToken, secretKey, {expiresIn: expiresIn}),
		expiresIn: expiresIn
	}

}

export {createToken}