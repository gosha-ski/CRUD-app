import * as jwt from "jsonwebtoken"

interface TokenData{
	token: string,
	expiresIn: number
}

interface DataInTokenJWT{
	user_id: string
}


export {TokenData, DataInTokenJWT}