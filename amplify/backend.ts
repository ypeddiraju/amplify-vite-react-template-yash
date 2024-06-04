import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myFirstFunction } from './my-first-function/resource';
import * as iam from "aws-cdk-lib/aws-iam"
import * as ses from "aws-cdk-lib/aws-ses"



const backend = defineBackend({
  auth,
  data,
  myFirstFunction,
})

const myFirstFunctionLambda = backend.myFirstFunction.resources.lambda;

myFirstFunctionLambda.addToRolePolicy(new iam.PolicyStatement({
  actions:  ["ses:*"],
  resources: ['*'],
  effect: iam.Effect.ALLOW,
}));


