#!/bin/sh

# activate kubernetes ingress
minikube addons enable ingress

# create secrets for mongo username and password in all 3 databases
kubectl create secret generic mongobook --from-literal MONGO_USERNAME=bookuser --from-literal MONGO_PASSWORD=book123 --from-literal MONGO_DATABASE=library_books
kubectl create secret generic mongocustomer --from-literal MONGO_USERNAME=customeruser --from-literal MONGO_PASSWORD=customer123 --from-literal MONGO_DATABASE=library_customers
kubectl create secret generic mongoorder --from-literal MONGO_USERNAME=orderuser --from-literal MONGO_PASSWORD=order123 --from-literal MONGO_DATABASE=library_orders

# create/config config map holds all environmental variables
kubectl apply -f ./k8s/m-library-config-map.yaml

# create/config persistent storage volume claim for mongodb
kubectl apply -f ./k8s/microservices-db-pvc.yaml

# create/config all deployments for mongodb, book, customer, order
kubectl apply -f ./k8s/mongodb-deployment.yaml
kubectl apply -f ./k8s/book-deployment.yaml
kubectl apply -f ./k8s/customer-deployment.yaml
kubectl apply -f ./k8s/order-deployment.yaml

# create/config all services(NordPort) for mongodb, book, customer, order
kubectl apply -f ./k8s/mongodb-node-port.yaml
kubectl apply -f ./k8s/book-node-port.yaml
kubectl apply -f ./k8s/customer-node-port.yaml
kubectl apply -f ./k8s/order-node-port.yaml

# create/config all services(ClusterIP) for mongodb, book, customer, order
kubectl apply -f ./k8s/mongodb-cluster-ip-service.yaml
kubectl apply -f ./k8s/book-cluster-ip-service.yaml
kubectl apply -f ./k8s/customer-cluster-ip-service.yaml
kubectl apply -f ./k8s/order-cluster-ip-service.yaml

# create/config ingress service
kubectl apply -f ./k8s/ingress-service.yaml

# create/config all at once
# kubectl apply -f ./k8s
