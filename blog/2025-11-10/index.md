---
title: My contributions to aedes-cli and mqemitter-redis 👨‍💻
description: I recently worked with MQTT and found some bugs...
slug: aedes-cli-and-mqemitter-redis-contributions
tags: [open-source, nodejs]
hide_table_of_contents: false
---
The two repositories I contributed to aren’t very popular: `aedes-cli` gets around 1,000 weekly downloads, and `mqemitter-redis` about 7,500. Still, I consider this a solid starting point for anyone looking to get involved in the open-source community.


<!-- truncate -->

## Understanding the components

For high-availability solutions, Redis offers a feature called [Sentinel](https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/#sentinels-and-replicas-auto-discovery).  
It essentially keeps instances in sync by sending a message to the `__sentinel__:hello` channel every two seconds.  
This allows us to detect when a Sentinel instance stops working as expected, and if the master Sentinel is affected, a failover process is triggered, promoting one of the replicas to master.

### mqemitter-redis

This [library](https://github.com/mcollina/mqemitter-redis) enables [MQEmitter](https://github.com/mcollina/mqemitter) to work across multiple processes using Redis as a message queue.  
It lets you subscribe to specific Redis channels using an event-emitter style API.  

For example, if a message is published on the `hello world` channel, the callback function below will be executed:

```js
emitter.on('hello world', function (message, cb) {
  console.log(message)
  cb()
})
```

### aedes-cli

This [repository](https://github.com/moscajs/aedes-cli) can use mqemitter-redis as a dependency to create an [MQTT Broker](https://www.emqx.com/en/blog/the-ultimate-guide-to-mqtt-broker-comparison#what-is-an-mqtt-broker) through a command-line interface.
(You can also configure it to use MongoDB.)

Once set up, you can start the broker using `aedes start`. Devices can then communicate with each other via the MQTT protocol: producers publish messages to specific topics, and the broker distributes those messages to the subscribers of each topic.

## The problem

When `mqemitter-redis` emits a message, it [formats](https://github.com/mcollina/mqemitter-redis/blob/16bfe821b32fcb69dfea6d3bba83c9a30010dcbd/mqemitter-redis.js#L156) it as an object, encodes it, and sends it to the topic's queue (redis channel). 

This object contains two fields: an unique identifier and the actual message. It looks like this:

```js
const packet = {
    id: hyperid(),
    msg
  }
``` 

If there is any subscribed client to the topic where the message was published, the library will [receive an event](https://github.com/mcollina/mqemitter-redis/blob/master/mqemitter-redis.js#L65) containing a payload, decode the message, and emit it internally again. 

This emit function has an [assertion](https://github.com/mcollina/mqemitter/blob/f867d3aab36e111c9f46f6f714c922c60bffb4c2/mqemitter.js#L99) that ensures the message has content, and only after this check will the callback (`emitter.on`) be invoked.

For this whole system to work, the packet must be a valid object.
If someone tries to publish a message to a topic that has subscribers, and the content is malformed, MQEmitter will throw an exception and the process will stop running.

### Wildcard

The MQTT protocol allows you to subscribe to specific topics.
For example, let’s say you’re an IoT enthusiast connecting all the devices in your house. In your kitchen, you might have a fridge, rice cooker, and air fryer; in your living room, a TV, game consoles, and smart lights.

If you want to receive all the TV-related messages, you could subscribe to a topic like `living_room/tv`.

But MQTT also supports wildcards, allowing you to listen to multiple topics at once — for example:

Subscribe to all devices in your kitchen with `kitchen/#`

Subscribe to all devices in your house with just `#`

### Sentinels

When subscribing to all topics, MQTT also receives the Sentinel messages sent to the `__sentinel__:hello` channel.  

The payload of these messages is described in the official documentation as:

> Every Sentinel publishes a message to every monitored master and replica Pub/Sub channel `__sentinel__:hello` every two seconds, announcing its presence with ip, port, and runid.

As you can imagine, the `id:port:runid` payload is malformed!  

So whenever I tried to subscribe to `#`, I was also receiving messages from Sentinels (messages that were published outside the `mqemitter-redis` context) causing the system to crash.

## The fix

There was no secret to implementing the solution — I simply created a list of ignored topics that `mqemitter-redis` should discard before emitting messages internally.  
Right now, it only contains `__sentinel__:hello`, but it’s open for expansion if anyone finds another edge case in the future.

I also added test cases to validate the implementation, ensuring that my changes wouldn’t interfere with scenarios where messages are meant to be published internally.

## Conclusion

You can check out my pull requests and issues below:

- **PRs:**
  - https://github.com/mcollina/mqemitter-redis/pull/110
  - https://github.com/moscajs/aedes-cli/pull/180
- **Issues:**
  - https://github.com/mcollina/mqemitter-redis/issues/109
  - https://github.com/moscajs/aedes-cli/issues/179

I hope to have more opportunities to contribute to open-source projects in the future... I’ll definitely be on the lookout for more!
