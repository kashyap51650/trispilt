import {
  fetchContributions,
  fetchUserContributions,
} from "@/actions/contribution";
import { Contribution } from "@/types";
import { useState } from "react";

type ContributionArray = { month: string; items: Contribution[] }[];

export const useContribution = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contributions, setContributions] = useState<ContributionArray>([]);

  const transformContributions = (data: Contribution[]) => {
    const map = new Map<string, { month: string; items: Contribution[] }>();
    for (const contribution of data) {
      const { month } = contribution;
      if (!map.has(month)) {
        map.set(month, { month, items: [] });
      }
      map.get(month)!.items.push(contribution);
    }
    return Array.from(map.values()).sort((a, b) => {
      const [unusedA, monthA] = a.month.split("-");
      const [unusedB, monthB] = b.month.split("-");
      return Number(monthB) - Number(monthA);
    });
  };

  const getContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchContributions();
      const contributionArray = transformContributions(data);

      setContributions(contributionArray);
    } catch (err) {
      setError("Failed to fetch contributions");
    } finally {
      setLoading(false);
    }
  };

  const getSelfContributions = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserContributions(userId);
      const contributionArray = transformContributions(data);
      console.log("contributionArray", contributionArray);
      setContributions(contributionArray);
    } catch (err) {
      setError("Failed to fetch contributions");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    contributions,
    getContributions,
    getSelfContributions,
  };
};
