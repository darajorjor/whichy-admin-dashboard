/**
 * Load modules synchronously in development,
 * and asynchronously in production
 * (change `./sync` to `./async` via webpack.NormalModuleReplacementPlugin).
 * */
import loadComponent from './sync'

/**
 * use the default export to load components dynamically
 * (component-level code splitting)
 * */
export default loadComponent

/**
 * use named exports to load routes dynamically
 * (route-level code splitting)
 * */
export const Home = loadComponent('Home')
export const Login = loadComponent('Login')
export const Questions = loadComponent('Questions')
