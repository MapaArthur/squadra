import Cookie from 'js-cookie';
import Encryption from "./Encryption";

export default class Cookies {
    //Cookie names
    static LOGIN_DATA = "ld";

    //Keys
    static LOGIN_DATA_KEY = "ff6bbb646b5211b4c2007c4cd429ac364ea9392c";

    /**
     * Create a cookie
     * @param {String} name The name of the cookie
     * @param {Object} data The data to be stored in cookie
     * @param {String} [salt=null] The salt to encrypt the data that will be stored in cookie (opcional)
     * @param {Number} [expires=null] The time (in days) to expire the cookie (opcional)
     * @returns {Boolean} If the cookie was stored successfully
     */
    static createCookie(name, data, expires = null, salt = null) {
        if (!data){
            return false; 
        }
        try{
            data = JSON.stringify(data);
            if(salt){                    
                var encryptedData = Encryption.encryptByAES(data, salt);
                if(encryptedData){
                    Cookie.set(name, encryptedData, { expires });
                } else {
                    return false;
                }
            } else{
                Cookie.set(name, data, { expires }); 
            }
            return true;  
        } catch(e){
            return false;
        }              
    }

    /**
     * Get a cookie
     * @param {String} name The name of the cookie
     * @param {String} [salt=null] The salt to decrypt the data (opcional)
     * @returns {Object} The cookie data
     */
    static getCookie(name, salt = null) {
        try{
            let data = Cookie.get(name);
            if(data){
                if(salt){
                    data = Encryption.decryptByAES(data, salt);            
                    if(data){
                        return JSON.parse(data);
                    } else{
                        Cookie.remove(name);
                        return null;
                    }
                } else {
                    return JSON.parse(data);
                }
            } else{                
                return null;
            }
        } catch(e){
            return null;
        }                   
    }

    /**
     * Remove a cookie
     * @param {String} name The name of the cookie
     * @returns {Boolean} If the cookie was removed successfully
     */
    static removeCookie(name) {
        try{
            Cookie.remove(name);
            return true;
        } catch(e){
            return false;
        }                    
    }
}