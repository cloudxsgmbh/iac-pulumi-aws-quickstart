/**
 * Do not forget to bootstrap the AWS account & region with CDK:
 * cdk bootstrap aws://<aws_account_id>/<aws_region>
 */

import * as path from "path";
import * as pulumi from "@pulumi/pulumi";
import * as pulumicdk from "@pulumi/cdk";
import { Duration } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";

class CdkDemoClass extends pulumicdk.Stack {
  fnArn: pulumi.Output<string>;

  constructor(id: string, options?: pulumicdk.StackOptions) {
    super(id, options);

    const fn = new lambda.Function(this, "LambdaFn", {
      code: lambda.Code.fromAsset(path.join(__dirname, "lambda")),
      handler: "index.main",
      timeout: Duration.seconds(29),
      runtime: lambda.Runtime.PYTHON_3_9,
    });

    this.fnArn = this.asOutput(fn.functionArn);

    this.synth();
  }
}

export default CdkDemoClass;
