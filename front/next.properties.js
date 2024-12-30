const loginPath = "/auth/signin"
const logoutPath = "/auth/logout"
const refreshTokenPath = "/auth/refresh"

const NextJsAppProperties = {
    login_endpoint: loginPath,
    logout_endpoint: logoutPath,
    refreshToken_endpoint: refreshTokenPath,
}

module.exports = NextJsAppProperties
