using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming bid placed");
        Console.WriteLine(@$"Amount is {context.Message.Amount} and CurrentHighBid is {context.Message.Bidder}");
        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        Console.WriteLine(@$"Amount is {context.Message.Amount} and CurrentHighBid is {auction.CurrentHighBid}");
        if (context.Message.BidStatus.Contains("Accepted")
            && context.Message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = context.Message.Amount;
            await auction.SaveAsync();
        }
    }
}
