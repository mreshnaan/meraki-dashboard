import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useGetQueryWithJwt = (url, jwt) => {
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        const { data } = await response.json();
        return data;
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    },
    enabled: !!jwt, // Enable the query only if jwtToken is available
  });

  useEffect(() => {
    if (isLoading) {
      const toastId = toast.loading("Loading data...");
      return () => {
        toast.dismiss(toastId);
      };
    } else if (isError) {
      const toastId = toast.error("Failed to fetch data");
      return () => {
        toast.dismiss(toastId);
      };
    } else if (data) {
      const toastId = toast.success("Data fetched successfully");
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [isLoading, isError, data]);

  return { isLoading, isError, data, error, refetch };
};

export default useGetQueryWithJwt;
