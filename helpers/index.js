exports.url_refer = function(url){
    if (url.includes("?")) {
        return url
    } else {
        return url+="?utm_source=hackerqueue"
    }
};