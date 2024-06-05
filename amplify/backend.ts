import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myFirstFunctionV2 } from './my-first-function/resource';
import * as iam from "aws-cdk-lib/aws-iam"
import * as ses from "aws-cdk-lib/aws-ses" 
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';



const backend=defineBackend({
  auth,
  data,
  myFirstFunctionV2,
})

const myFirstFunctionLambda = backend.myFirstFunctionV2.resources.lambda;

myFirstFunctionLambda.addToRolePolicy(new iam.PolicyStatement({
  actions:  ["ses:*"],
  resources: ['*'],
  effect: iam.Effect.ALLOW,
}));

const rule = new Rule( this,'Rule', {
  schedule: Schedule.cron({
    minute: '*/5',
  }),
});


// 👇 Defining our Lambda function as the target for our CloudWatch Event Rule
rule.addTarget(new LambdaFunction(myFirstFunctionLambda));



