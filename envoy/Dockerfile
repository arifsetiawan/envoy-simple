FROM lyft/envoy:latest

RUN apt-get update \
 && apt-get install -y --force-yes --no-install-recommends \
      apt-transport-https \
      curl \
      ca-certificates \
 && apt-get clean \
 && apt-get autoremove \
 && rm -rf /var/lib/apt/lists/*

CMD /usr/local/bin/envoy -c /etc/front-envoy.json --service-cluster front-proxy
