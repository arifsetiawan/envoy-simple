
var PROTO_PATH = './hello.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

function main() {
    var client = new hello_proto.Greeter('192.168.99.100:80',
                                       grpc.credentials.createInsecure());
    var name = "Someone"
    client.sayHello({name: name}, function(err, response) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Greeting:', response.message);
        }
    });
}

main();