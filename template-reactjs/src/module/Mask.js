export default class Mask{
    static MASK_UF = "##";
    static MASK_HOUR = "##:##";
    static MASK_DATE = "##/##/####";
    static MASK_DATE_HOUR = "##/##/#### ##:##";
    static MASK_PHONE = "(##) ####-####";
    static MASK_CELLPHONE = "(##) #####-####";
    static MASK_RG = "##.###.###";
    static MASK_CPF = "###.###.###-##";
    static MASK_CNPJ = "##.###.###/####-##";
    static MASK_POSTAL_CODE = "#####-###";
    static MASK_CARD = "#### #### #### ####";
    static MASK_EXPIRE_DATE = "##/####";
    static MASK_CVV = "###";

    /**
     * Removes the mask form the text
     * @param {String} text - Text that will be unmasked 
     * @returns {String} Unmasked text
     */
    static unmask(text) {
        return text.replace(/\./g, "").replace(/-/g, "")
                .replace(/\//g, "").replace(/\(/g, "")
                .replace(/\)/g, "").replace(/:/g, "")
                .replace(/ /g, "").replace(/,/g, "");
    }

    /**
     * Apply a mask on the text
     * @param {String} mask - Mask to be applied
     * @param {String} text - Text to apply mask
     * @returns {String} Masked text
     */
    static applyMask(mask, text){
        if(mask && mask.length > 0 && text && text.length > 0) {
            text = this.unmask(text);
            let out = "";
            let i = 0;
            let j = 0;
            while (i < mask.length && j < text.length) {
                if (mask[i] === '#') {
                    out += text[j];
                    j++;
                } else {
                    out += mask[i];
                }
                i++;
            }
            return out;
        }
        return text;
    }

    /**
     * Apply a generic phone mask on the text
     * @param {String} text Text to apply mask
     * @returns {String} Masked text
     */
    static genericPhoneMask(text){
        if(text.length <= this.MASK_PHONE.length) {
            return this.applyMask(this.MASK_PHONE, text);
        } else {
            return this.applyMask(this.MASK_CELLPHONE, text);
        }
    }

    /**
     * Apply a cpf or cnpj mask, depending on the length of the text
     * @param {String} text Text to apply mask 
     * @returns {String} Masked text
     */
    static formatCpfCnpj(text){
        if(text.length <= this.MASK_CPF.length) {
            return this.applyMask(this.MASK_CPF, text);
        } else {
            return this.applyMask(this.MASK_CNPJ, text);
        }
    }
    
    /**
     * Apply a decimal mask
     * @param {String} text Text to apply mask 
     * @param {String} prefix Prefix of the decimal 
     * @param {Number} limit limit the decimal to certain number 
     * @returns {String} Masked text
     */    
    static formatDecimal(value, prefix = "", limit = null) {
        value = this.unmaskDecimal(value, prefix, limit);
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        if(prefix){
            value = `${prefix} ${value}`;
        }
        return `${value.substring(0, value.length - 3)},${value.substring(value.length-2, value.length)}`;
    }

    /**
     * Remove decimal mask
     * @param {String} text Text to apply mask 
     * @param {String} prefix Prefix of the decimal 
     * @param {Number} limit limit the decimal to certain number 
     * @returns {String} Unmasked text
     */
    static unmaskDecimal(value, prefix = "", limit = null) {
        value = this.unmask(value.replace(prefix, "").replace("^0+", ""));
        value = Number(value);
        if(isNaN(value)){
            value = 0;
        }
        value = (value/100).toFixed(2);
        if(limit && (value > limit)){
            value = limit.toFixed(2);
        }
        return value;
    }
}
