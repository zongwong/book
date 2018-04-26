import config from "../utils/global";

export default (src) => {
    if(/^http/.test(src) ||  /^blob/.test(src)){
        return src;
    }else{
        return config.host + src;
    }
}