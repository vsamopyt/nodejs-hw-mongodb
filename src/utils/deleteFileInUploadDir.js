import * as fs from "node:fs/promises";
import * as path from "path"; 
import createHttpError from "http-errors";

import { UPLOAD_DIR } from "../constants/index.js";


const deleteFileInUploadDir = async fileName => {
    
    const oldPath = path.join(UPLOAD_DIR, fileName);

  try {
    await fs.access(oldPath);
    await fs.unlink(oldPath);
  }
  catch(error) {
    if(error.code !== "ENOENT")  {
     throw createHttpError (500, `Error accessing or deleting file: ${error.message}`);
        
    }

  }

    
    

  
};

export default deleteFileInUploadDir;