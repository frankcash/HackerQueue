exports.url_refer = (url)=>{
    if (!url.includes("?")) {
        return url+="?utm_source=hackerqueue"
    }
    return url
};

exports.wrap = (arr)=>{
	return {Crawls: arr}
}

exports.fixSelfPost = (base_url, url)=>{
	console.log(base_url, url)
	if(url !== null){
	  if(url.match("http") === null){
  	  return (base_url + url);
  	}
  	return url;
	}
}




