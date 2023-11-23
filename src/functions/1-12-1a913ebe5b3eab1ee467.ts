import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const testFinal2 => {}

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("1-12-1a913ebe5b3eab1ee467", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('1-12-1a913ebe5b3eab1ee467', {
    connection: 'azureQueueConnection',
    queueName: '1-12-1a913ebe5b3eab1ee467',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});