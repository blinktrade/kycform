# BlinkTrade KYC Form

## Setup

Before you can run or deploy the sample, you will need to do the following:

1. Enable the Cloud Storage API in the [Google Developers Console](https://console.developers.google.com/project/_/apiui/apiview/storage/overview).

1. Create a Cloud Storage Bucket. You can do this with the [Google Cloud SDK](https://cloud.google.com/sdk)
with the following command:

        gsutil mb gs://<your-bucket-name>

1. Set the default ACL on your bucket to public read in order to serve files
directly from Cloud Storage. You can do this with the [Google Cloud SDK](https://cloud.google.com/sdk)
with the following command:

        gsutil defacl set public-read gs://<your-bucket-name>

1. Update the environment variables in `app.yaml`.

## Running locally

When running locally, you can use the [Google Cloud SDK](https://cloud.google.com/sdk)
to provide authentication to use Google Cloud APIs:

    gcloud init

Then set environment variables before starting your application:

    export API_KEY=<blinktrade-api-key>
    export API_SECRET=<blinktrade-api-secret>

    export GCLOUD_PROJECT=<your-project-id>
    export GCLOUD_STORAGE_BUCKET=<your-bucket-name>

    export DROPBOX_ACCESS_TOKEN=<dropbox-access-token>

    npm install
    npm run dev

Open your browser with those repective parameters:

`http://localhost:8080/?user_id=90000000&username=username&broker_id=4&broker_username=foxbit&email=email@gmail.com&phoneNumber[country]=55&address[state]=SP&address[country]=Brazil`

# LICENSE

[GPLv3](./LICENSE)
