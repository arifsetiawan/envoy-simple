var PROTO_PATH = './hello.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

function sayHello(call, callback) {
    console.log("Incoming", call)

    if (call.request.name === "Error") {
        var err = new Error('Unauthorized');
        err.code = grpc.status.PERMISSION_DENIED;

        // custom metadata
        var metadata = new grpc.Metadata();
        metadata.set('key1', 'value2');
        metadata.set('key2', 'value2');
        err.metadata = metadata;
        return callback(err)
    }
    
    return callback(null, {message: 'Hello ' + call.request.name});
}

function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("Service started")
}

main();