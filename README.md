# Carsties
## kubectl apply -f postgres-depl.yml
## kubectl apply -f config.yml
## kubectl get pods 
## kubectl get deployments 
## kubectl describe pod postgres-8d8d67d75-jtzs4
## kubectl get services
## kubectl get services -n ingress-nginx
## kubectl rollout restart deployment auction-svc
## kubectl rollout restart deployment search-svc
## kubectl rollout restart deployment notify-svc
## kubectl rollout restart deployment identity-svc
## kubectl rollout restart deployment gateway-svc
## kubectl rollout restart deployment webapp-svc
## kubectl get namespaces
## kubectl get secrets
## kubectl create secret tls carsties-app-tls --key server.key --cert server.crt


## kubectl rollout restart deployment identity-svc
## mkcert -key-file server.key -cert-file server.crt id.carsties.local app.carsties.local api.carsties.local