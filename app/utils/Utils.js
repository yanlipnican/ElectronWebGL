import fs from 'fs';
import path from 'path';

export async function listFiles(dir){
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if(err){
                resolve({error : err});
            } else {
                for(let key in files){
                    files[key] = path.join(dir, files[key]);
                }
                resolve({files});
            }
        })
    });
}

export function fileStats(dir){
    return new Promise((resolve) => {
         fs.stat(dir, (err, stats) => {
             if(err){
                 resolve({error : err});
             } else {
                 resolve({stats});
             }
         })
    })
}

export async function isDirectory(dir){
    let stats = await fileStats(dir);
    if(!stats.error){
        return stats.stats.isDirectory();
    } else {
        return {error : stats.error};
    }
}

export async function getFileTree(dir){
    let getFiles = await listFiles(dir);
    
    if(!getFiles.error){

        let files = getFiles.files;
        let result = [];

        for(let key in files){
            let filePath = files[key];
            let isDir = await isDirectory(filePath);
            if(isDir.error) return {error : isDir.error};
            let path = filePath.split('/');
            let fileName = path[path.length - 1];

            result.push({
                name : fileName,
                parentDir : dir,
                path : filePath,
                isDir : isDir,
                files : isDir ? await getFileTree(filePath) : []
            });
        }

        return result;

    } else {
        return {error: getFiles.error};
    }
}