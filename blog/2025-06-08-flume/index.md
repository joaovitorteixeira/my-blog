---
title: Implementing a Custom Source in Apache Flume ℹ️
description: A custom Source implementation in Apache Flume to collect data from an earthquake endpoint.
slug: implementing-custom-source-in-apache-flume
tags: [java, data-stream]
hide_table_of_contents: false
---
Since my last post, many things have changed in my life... all of them are good changes! One exciting update I’d like to share is that I’ve started a post-graduation program in Data Engineering. And today, I’m bringing a project I worked on over the weekend.


<!-- truncate -->

## Initial Considerations 
It is been a while since my last post, and this one will be a very small one. But my idea for the future is to create more study case like this, using different technologies and programming languages.

Regarding the repository that this article talks about, I also have to mention that my last time working with Java was around 5 years ago, since then I haven't touch any Java application. So, you might find something in my code that is not the right way. Feel free to let me know, I'm more than happy to get good tips about Java!

## Apache Flume
[Apache Flume](https://flume.apache.org/) is a very powerful technology that can efficiently collect a large amount of data and move it another place. It uses *agents* which is a JVM (Java Virtual Machine) process that handles data events that flows from an external source to its destination. 

An agent have three main components:
- **Source**: Consumes data from an external source. This could be via polling, webhooks, or other mechanisms.
- **Channel**: When the events are received, they are stored in the channels. These events will be stored until they get consumed by the sink.
- **Sink**: Removes the data from the channels and put it into an external destination. This external destination in my example will be a kafka.

This is a very simplified explanation of how Flume works, it can have much more customization in which I'm still not very familiar with.

## Creating a Custom Source
During my study I had an idea of creating my custom source, so I can get more familiar with the technology. I've found a really good [Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/)  that became the perfect starting point for this experiment.

Since the API doesn’t offer a WebSocket for live data streaming, I had to implement a [PollableSource](https://flume.apache.org/releases/content/1.7.0/apidocs/org/apache/flume/PollableSource.html) interface. This allows Flume to handle the pooling system for me, and my only responsibility would be the collection and sending the data to the channels.

### Challenges
One challenge I encountered was that the API restricts the number of events it can send in one request, which is 2000. Also, I had problems heap memory issues when consuming a large amount of data. 

To handle it, I wrote logic that dynamically shortens the time range for polling if too many events are detected in the dates window. Right now, the batch size is hardcoded to 200, but it could easily be externalized later so users can configure it themselves.

## Example of usage
First of all, you'll need to generate the JAR package by running the following [Maven](https://maven.apache.org/) command:

```bash
mvn clean package
```

This will create a target/ directory containing a file named:

```bash
flume-earthquake-1.0-SNAPSHOT.jar
```

Move this JAR file into the `lib/` folder inside your Apache Flume installation directory.

Once that’s done, you can use a configuration like this:

```properties
EarthquakeAgent.sources=Earthquake
EarthquakeAgent.channels=MemChannel
EarthquakeAgent.sinks=kafkaSink

EarthquakeAgent.sources.Earthquake.type=org.jvt.EarthquakeSource
EarthquakeAgent.sources.Earthquake.dateStart=2025-06-01T00:00:00Z

EarthquakeAgent.sinks.kafkaSink.type=org.apache.flume.sink.kafka.KafkaSink
EarthquakeAgent.sinks.kafkaSink.kafka.bootstrap.servers=localhost:9092
EarthquakeAgent.sinks.kafkaSink.kafka.topic=earthquake-events
EarthquakeAgent.sinks.kafkaSink.kafka.flumeBatchSize=20

#EarthquakeAgent.channels.MemChannel.capacity=10000
#EarthquakeAgent.channels.MemChannel=transactionCapacity=100
EarthquakeAgent.channels.MemChannel.type=file

EarthquakeAgent.sources.Earthquake.channels=MemChannel
EarthquakeAgent.sinks.kafkaSink.channel=MemChannel
```

With this setup, the custom Flume source will start polling earthquake data from the USGS API and pushing events to a Kafka topic.

## Repository
Feel free to explore or fork the project from my [GitHub repository](https://github.com/joaovitorteixeira/flume-earthquake) !

That is all for today. Thanks for reading! 😅