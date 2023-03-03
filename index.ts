import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
//import * as awsx from "@pulumi/awsx";
import CdkDemoClass from "./CdkDemoClass";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
  website: {
    indexDocument: "index.html",
  },
});

new aws.s3.BucketObject(
  "index.html",
  {
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html"),
    acl: "public-read",
    contentType: "text/html; charset=utf-8",
  },
  {}
);

const cdkdemo = new CdkDemoClass("CdkDemo");

// Pulumi Outputs
export const bucketName = bucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
