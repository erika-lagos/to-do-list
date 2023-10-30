const subscribers = {};

function subscribe(topic, subscriberFunction) {
    // check if topic exists
    //if topic doesn't exist, create it 
    if (subscribers[topic] === undefined) {
        subscribers[topic] = [];
    }
    //add a new subscriber to the topic
    subscribers[topic].push(subscriberFunction);
}

function publish(topic, data) {
    if (subscribers[topic] === undefined) {
        return;
    }
    //find the list fo susbcribers for that topic
    //apply the function to all the subscribers of that topic
    subscribers[topic].forEach(subscriberFunction => {
        subscriberFunction(data);
    })
}

export { subscribe, publish };