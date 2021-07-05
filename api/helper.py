# Connecting to AWS
from app import app
import boto3, botocore
from config import S3_SECRET,S3_BUCKET, S3_KEY

s3 = boto3.client(
    "s3",
    aws_access_key_id = S3_KEY,
    aws_secret_access_key = S3_SECRET,
)

def upload_file_to_s3(file, filename, content_type,  bucket_name, acl ="public-read"):
 
    try:
        s3.upload_fileobj(
            file, 
            bucket_name,
            filename,
            ExtraArgs = {
                "ACL" : acl,
                "ContentType" : content_type
            }
        )
      
    except Exception as e:
        return "error"
    
    # Returning the url of the file
    return "{}{}".format(app.config["S3_LOCATION"], filename)