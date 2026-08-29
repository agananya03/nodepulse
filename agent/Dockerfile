FROM node:20-slim
WORKDIR /app

RUN apt-get update && apt-get install -y curl && \
    curl -L https://github.com/prometheus/node_exporter/releases/download/v1.8.2/node_exporter-1.8.2.linux-amd64.tar.gz -o node_exporter.tar.gz && \
    tar xvf node_exporter.tar.gz && \
    mv node_exporter-1.8.2.linux-amd64/node_exporter /bin/node_exporter && \
    rm -rf node_exporter.tar.gz node_exporter-1.8.2.linux-amd64

COPY register.js .
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 9100
CMD ["./start.sh"]