import { defineFunction } from "@aws-amplify/backend";
    
export const myFirstFunctionV2 = defineFunction({
  name: "my-first-function",
  entry: "./handler.ts"
  
  
});


