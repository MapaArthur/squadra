import CryptoJS from "crypto-js";

export default class Encryption{

    static encryptByTDES(text, salt){
        if (text === null)
            return null;
        if (text === "")
            return "";
        // transforma o json em um array de bytes
        var DataToEncrypt = CryptoJS.enc.Utf8.parse(text);
        // transforma a chave em um array de bytes usando Utf8 e depois cria uma hash em MD5
        // como a hash só tem 16 bytes é necessário usar os 8 primeiros bytes e concatenar no final para formar 24 bytes
        var TDESKey = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(salt));
        var k1 = TDESKey.words.slice(0, 2);
        TDESKey.words = TDESKey.words.concat(k1);
        TDESKey.sigBytes = 24;
        // encripta o dado
        var encryptedData = CryptoJS.TripleDES.encrypt(DataToEncrypt, TDESKey, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        // retorna o dado no formato de base64
        return encryptedData.toString();        
    }

    static decryptByTDES(ciphertext, salt){
        // passa o dado em base64 para um array de bytes
        var dataToDecrypt = CryptoJS.enc.Base64.parse(ciphertext)
        // transforma a chave em um array de bytes usando Utf8 e depois cria uma hash em MD5 
        // como a hash só tem 16 bytes é necessário usar os 8 primeiros bytes e concatenar no final para formar 24 bytes      
        var TDESKey = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(salt));
        var k1 = TDESKey.words.slice(0, 2);
        TDESKey.words = TDESKey.words.concat(k1);
        TDESKey.sigBytes = 24;
        try{
            // decripta o dado
            var decryptedData = CryptoJS.TripleDES.decrypt({ciphertext: dataToDecrypt}, TDESKey, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
            // retorna o dato em formato json
            var result = CryptoJS.enc.Utf8.stringify(decryptedData);
            return result;            
        }
        catch(e){
            return false;
        }
    }

    static encryptByAES(text, salt){
        if (text === null)
            return null;
        if (text === "")
            return "";
        // transforma o json em um array de bytes
        var dataToEncrypt = CryptoJS.enc.Utf8.parse(text);
        // cria uma key de 256 bits em SHA-3 usando o salt
        var key = CryptoJS.SHA3(salt, { outputLength: 256 });
        // cria uma iv em Hex usando o salt
        var iv = CryptoJS.enc.Hex.parse(salt);
        // encripta o dado em AES
        var encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, {iv: iv});
        // retorna o dado no formato de base64
        return encrypted.toString();
    }

    static decryptByAES(ciphertext, salt){
        // passa o dado em base64 para um array de bytes
        var dataToDecrypt = CryptoJS.enc.Base64.parse(ciphertext);
        // cria uma key de 256 bits em SHA-3 usando o salt
        var key = CryptoJS.SHA3(salt, { outputLength: 256 });
        // cria uma iv em Hex usando o salt
        var iv = CryptoJS.enc.Hex.parse(salt);             
        try{
            // descripta o dado em AES       
            var decrypted = CryptoJS.AES.decrypt({ciphertext: dataToDecrypt}, key, {iv: iv});
            // retorna o dato em formato json   
            var result = CryptoJS.enc.Utf8.stringify(decrypted);
            return result;
        }
        catch(e){
            return false;
        }
    }    

    static readImageAsDataURL(file){
        var fileReader = new FileReader();
        fileReader.onload = (e) => {
            return e.target.result;                
        }       
        fileReader.readAsDataURL(file);
    }  
}