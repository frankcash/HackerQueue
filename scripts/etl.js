const db = require('../db');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');

const projectId = process.env.GCLOUD_PROJECT_ID;
const bucketName = process.env.GCLOUD_STORAGE_BUCKET;


extract = (query, fileName)=>{
    return new Promise(function(resolve, reject) {
        db.query(query, (err, res) => {
            if (err) {
              console.log(err);
              return err
            }
            fs.writeFile(fileName, JSON.stringify(res.rows), function(err) {
                if(err) {
                    console.log(err);
                    return err
                }else{
                    write(fileName)
                }
            }); 
          })
    })
}


write = async(fileName)=>{
    const storage = new Storage();
    const [files] = await storage.bucket(bucketName).getFiles();
    await storage.bucket(bucketName).upload(fileName, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });
}

function main(){
    const query = "SELECT crawl_id, story_url, source, title, comments, crawled_at FROM crawls;";
    const time = new Date();
    const fileName = `crawler-etl-${time}.json`;
    console.log(fileName)
    extract(query, fileName)
}

main()