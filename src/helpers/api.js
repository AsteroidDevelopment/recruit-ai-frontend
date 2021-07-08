export const apiPath = (path) => { return `https://recruit-ai-backend.herokuapp.com/api${path}` }

//Component paths
export const userPath = (path = "") => { return apiPath(`/users${path}`) }
export const authPath = (path = "") => { return userPath(`/auth${path}`) }

//Auth Paths
export const registerPath = () => { return authPath(`/register`) }
export const verifyUserPath = (username, hash) => { return  authPath(`/verify/${username}/${hash}`) }
export const loginPath = () => { return authPath(`/login`) }
export const forgotPasswordPath = (username) => { return authPath(`/forgottenPassword/${username}`) }
export const resetPasswordPath = (username, hash) => { return authPath(`/resetPassword/${username}/${hash}`) }


export default {
    apiPath, 
    userPath, 
    authPath,
    registerPath,
    verifyUserPath,
    loginPath,
    forgotPasswordPath,
    resetPasswordPath,
}