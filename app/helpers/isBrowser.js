/* eslint-disable no-new-func */
export default new Function('try {return this===window;}catch(e){ return false;}')()
