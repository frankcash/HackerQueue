exports.url_refer = (url)=>{
    if (url.includes("?")) {
        return url
    } else {
        return url+="?utm_source=hackerqueue"
    }
};