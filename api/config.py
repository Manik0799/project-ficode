import os

S3_BUCKET = os.getenv("S3_BUCKET_NAME")
S3_KEY    = os.environ.get("S3_ACCESS_KEY")
S3_SECRET   = os.environ.get("S3_SECRET_ACCESS_KEY")
S3_LOCATION    = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)
