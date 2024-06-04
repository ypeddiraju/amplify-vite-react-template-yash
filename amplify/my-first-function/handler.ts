import { Handler } from "aws-cdk-lib/aws-lambda";

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "ap-south-1" });


export const handler: Handler = async(event: any,context : any,callback: any) => {
  const body = event.queryStringParameters.body;
  const subject = event.queryStringParameters.subject;
  const toMail: string = event.queryStringParameters.toMail;
  
  //console.log(body);
  
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [toMail],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },

      Subject: { Data: subject },
    },
    Source: "yashwanthpeddiraju007@gmail.com",
  });

  try {
    let response = await ses.send(command);
    // process data.
    console.log(response["$metadata"]["httpStatusCode"])
    return response;
  }
  catch (error) {
    callback(new Error("Invalid request"));
  }
  finally {
    // finally.
  }
};
