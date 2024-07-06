"use client";
import useGetStockByRule from "@/hooks/api/store-product/useGetStockByRule";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useState } from "react";
import ImageChooseStore from "../../../../../public/superAdminCS.svg";
import ImageNotFoundStore from "../../../../../public/no-store.svg";
import StoreAdmin from "./components/storeAdmin/StoreAdmin";
import StoreInventoryTable from "./components/superAdmin/StoreInventoryTable";
import Stores from "./components/superAdmin/Stores";
import { debounce } from "lodash";

const Inventory = () => {
  const { role } = useAppSelector((state) => state.user);
  const [stockPage, setStockPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [activeStoreId, setActiveStoreId] = useState<string>("");
  const { stocks, isLoading, refetch, metaStock } = useGetStockByRule({
    page: stockPage,
    take: 5,
    search,
    storeId: activeStoreId,
  });

  const handleSearch = debounce((value: string) => {
    setSearch(value);
  }, 300);

  const handleStoreClick = (storeId: number) => {
    setActiveStoreId(storeId.toString());
  };

  const handleChangePaginateStock = ({ selected }: { selected: number }) => {
    setStockPage(selected + 1);
  };

  const takeStock = metaStock?.take || 1;

  const filteredStocks = Number(activeStoreId)
    ? stocks?.storeProducts?.data.filter(
        (storeProduct) => storeProduct.store.id === Number(activeStoreId),
      )
    : stocks?.storeProducts?.data;

  if (!stocks) {
    return (
      <div className="mx-auto flex flex-col items-center justify-center gap-7">
        <div className="text-center text-xl font-bold">
          You don&#39;t have any store
        </div>
        <div>
          <Image
            src={ImageNotFoundStore}
            alt="ImageNotFoundStore"
            width={600}
            height={600}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <main className="container py-16">
      {role === "SUPERADMIN" && (
        <div>
          <Stores
            onStoreClick={handleStoreClick}
            activeStoreId={activeStoreId}
          />

          {activeStoreId ? (
            <>
              <StoreInventoryTable
                storeId={Number(activeStoreId)}
                filteredStocks={filteredStocks}
                takeStock={takeStock}
                handleChangePaginateStock={handleChangePaginateStock}
                stocks={stocks}
                refetch={refetch}
                handleSearch={handleSearch}
              />
            </>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center gap-7">
              <div className="text-center text-xl font-bold">
                Choose a store
              </div>
              <div>
                <Image
                  src={ImageChooseStore}
                  alt="ImageChooseStore"
                  width={600}
                  height={600}
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
              </div>
            </div>
          )}
        </div>
      )}

      {role === "STOREADMIN" && (
        <StoreAdmin
          stocks={stocks}
          handleSearch={handleSearch}
          stockPage={stockPage}
          handleChangePaginateStock={handleChangePaginateStock}
          refetch={refetch}
        />
      )}
    </main>
  );
};

export default Inventory;
