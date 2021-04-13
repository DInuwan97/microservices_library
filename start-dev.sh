#!/bin/sh

# for development
# use NodePort insted of using CulterIP

# create secrets for mongo username and password
kubectl create secret generic mongousername --from-literal MONGO_USERNAME=mongouser
kubectl create secret generic mongopassword --from-literal MONGO_PASSWORD=12345

# start all k8 deplyments, services, secrets, presistance storage
#kubectl apply -f ./k8s
