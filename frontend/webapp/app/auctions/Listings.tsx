
"use client";
import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/auctionActions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import qs from "query-string";
import EmptyFilter from "../components/EmptyFilter";
import { useAuctionStore } from "@/hooks/useAuctionStore";
// import AppPagination from "../components/AppPagination";
// import { useParamsStore } from "@/hooks/useParamsStore";
//import { useParamsStore } from "@/hooks/useParamsStore";

export default function Listings() {
 //const [data, setData] = useState<PagedResult<Auction>>();
 const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }))
  );
  const data = useAuctionStore(
    useShallow((state) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );
  const setData = useAuctionStore((state) => state.setData);

   const setParams = useParamsStore((state) => state.setParams);
   const url = qs.stringifyUrl({ url: "", query: params });
   function setPageNumber(pageNumber: number) {
     setParams({ pageNumber });
   }
//  const [auctions, setAuctions] = useState<Auction[]>([]);
//  const [pageCount, setPageCount] = useState(0);
//  const [pageNumber, setPageNumber] = useState(1);
//  const [pageSize, setPageSize] = useState(4);

useEffect(() => {
  getData(url).then((data) => {
    setData(data);
    setLoading(false);
  });
}, [setData, url]);


if (loading) return <h3>Loading...</h3>;
// const setParams = useParamsStore((state) => state.setParams);
//     function setPageNumber(pageNumber: number) {
//        setParams({ pageNumber });
//      }
  //const data = await getData();
  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.auctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              pageChanged={setPageNumber}
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  );
}
