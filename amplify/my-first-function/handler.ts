import { Handler } from "aws-cdk-lib/aws-lambda";

export const handler : Handler = async (event: any) => {
    return "Hello from my first function!";
  };