#!/bin/sh

# for development
# use NodePort insted of using CulterIP
# start all k8 deplyments, services, secrets, presistance storages
kubectl apply -f ./k8s
