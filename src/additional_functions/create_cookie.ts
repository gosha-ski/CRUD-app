import {TokenData, DataInTokenJWT} from "../interfaces/token_interfaces"

function createCookie(tokenData: TokenData){
	return `AuthToken=${tokenData.token}`
}

export{createCookie}