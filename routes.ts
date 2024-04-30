/**
 * Array de rotas que são acessíveis ao público
 * Essas rotas não precisam de autenticação
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * Array de rotas que são usadas para autenticação
 * Essas vão redirecionar usuários logados
 * @type {string[]}
 */
export const authRoutes = ['/login', '/register']

/**
 * Prefixo para API de autenticação de rotas
 * As rotas precisam começar com esse prefixo usado para autenticação de API
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * Redirect default para rotas pós login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/home'
