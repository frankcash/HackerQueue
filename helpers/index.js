exports.url_refer = (url)=>{
    if (!url.includes("?")) {
        return url+="?utm_source=hackerqueue"
    }
    return url
};

exports.wrap = (arr)=>{
	return {Crawls: arr}
}
