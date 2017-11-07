
# Test Envoy gRPC-JSON 

Simple setup to test Envoy gRPC-JSON

## Simple server

```
cd server

// build docker
docker build -t grpc-simple:latest .

// run
docker run -d -p 50051:50051 --name grpc-simple grpc-simple:latest
```

## Run envoy

```
cd envoy

// create hello.pb
protoc hello.proto --include_source_info --include_imports --descriptor_set_out=hello.pb

// build docker
docker build -t envoy-simple:latest .

// run 
docker run -it -p 80:80 -p 9901:9901 --name envoy-simple -v $(pwd)/front-envoy.json:/etc/front-envoy.json -v $(pwd)/hello.pb:/etc/hello.pb envoy-simple:latest
```

## grpcc

Test grpc with https://github.com/njpatel/grpcc

```
grpcc --insecure --proto ./hello.proto --address 192.168.99.100:80

client.sayHello({name:'Jim'}, pr)

client.sayHello({name:'Error'}, pr)
```

## Curl

Test REST API with curl

```
curl -X POST http://192.168.99.100/api/v1/hello -d '{"name":"Jim"}' -v

curl -X POST http://192.168.99.100/api/v1/hello -d '{"name":"Error"}' -v
```
