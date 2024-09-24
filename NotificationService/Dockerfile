FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
EXPOSE 80


COPY Carsties.sln Carsties.sln
COPY AuctionService/AuctionService.csproj AuctionService/AuctionService.csproj
COPY SearchService/SearchService.csproj SearchService/SearchService.csproj
COPY GatewayService/GatewayService.csproj GatewayService/GatewayService.csproj
COPY IdentityService/IdentityService.csproj IdentityService/IdentityService.csproj
COPY Contracts/Contracts.csproj Contracts/Contracts.csproj
COPY BiddingService/BiddingService.csproj BiddingService/BiddingService.csproj
COPY NotificationService/NotificationService.csproj NotificationService/NotificationService.csproj

# Restore package deps
RUN dotnet restore Carsties.sln


# Copy the app folders over
COPY NotificationService src/NotificationService
COPY Contracts src/Contracts
WORKDIR /app/src/NotificationService
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "NotificationService.dll" ]
