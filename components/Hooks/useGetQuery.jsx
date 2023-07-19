import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useGetQuery = (url, jwt) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["data", url, jwt],
    async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        if (jwt) {
          headers.Authorization = `Bearer ${jwt}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        return data;
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    }
    // {
    //   refetchOnMount: false, // Prevent initial fetch on mount
    //   refetchOnWindowFocus: false, // Prevent refetch on window focus
    //   refetchOnReconnect: false, // Prevent refetch on reconnect
    // }
  );

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

export default useGetQuery;
