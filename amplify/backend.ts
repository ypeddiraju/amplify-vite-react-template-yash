import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myFirstFunctionV2 } from './my-first-function/resource';
import * as iam from "aws-cdk-lib/aws-iam"
import * as ses from "aws-cdk-lib/aws-ses" 
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';

import { Construct } from 'constructs';

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





