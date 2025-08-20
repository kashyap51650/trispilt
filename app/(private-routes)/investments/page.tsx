"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { IndianRupee, TrendingUp, Wallet, PlusCircle } from "lucide-react";

type InvestmentType =
  | "Equity"
  | "Mutual Fund"
  | "Fixed Deposit"
  | "Gold"
  | "Crypto";

type Investment = {
  id: string;
  name: string;
  type: InvestmentType;
  amountInvested: number; // principal invested
  currentValue: number; // current market value
  sipPerMonth?: number; // optional monthly SIP
  startDate: string; // ISO or display
};

const data: Investment[] = [
  {
    id: "1",
    name: "HDFC Flexi Cap",
    type: "Mutual Fund",
    amountInvested: 45000,
    currentValue: 51200,
    sipPerMonth: 2000,
    startDate: "2024-03-01",
  },
  {
    id: "2",
    name: "TCS",
    type: "Equity",
    amountInvested: 32000,
    currentValue: 38800,
    startDate: "2024-06-10",
  },
  {
    id: "3",
    name: "Axis Bluechip",
    type: "Mutual Fund",
    amountInvested: 28000,
    currentValue: 30150,
    sipPerMonth: 1500,
    startDate: "2023-12-05",
  },
  {
    id: "4",
    name: "SBI FD",
    type: "Fixed Deposit",
    amountInvested: 50000,
    currentValue: 54250,
    startDate: "2024-01-01",
  },
  {
    id: "5",
    name: "Sovereign Gold Bond",
    type: "Gold",
    amountInvested: 20000,
    currentValue: 22600,
    startDate: "2024-02-15",
  },
  {
    id: "6",
    name: "Bitcoin",
    type: "Crypto",
    amountInvested: 15000,
    currentValue: 18000,
    startDate: "2025-01-02",
  },
];

const currency = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const pct = (invested: number, current: number) =>
  ((current - invested) / invested) * 100;

const uniqueTypes: InvestmentType[] = Array.from(
  new Set(data.map((d) => d.type))
) as InvestmentType[];

export default function InvestmentsPage() {
  const totalInvested = data.reduce((s, d) => s + d.amountInvested, 0);
  const totalCurrent = data.reduce((s, d) => s + d.currentValue, 0);
  const totalSip = data.reduce((s, d) => s + (d.sipPerMonth || 0), 0);
  const overallPct = pct(totalInvested, totalCurrent);

  return (
    <main className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black leading-tight">Investments</h1>
          <p className="text-sm text-muted-foreground">
            Track totals, SIPs, and performance by type
          </p>
        </div>
        <Link
          href="/investments?add=true"
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          <PlusCircle className="h-4 w-4" /> Add investment
        </Link>
      </header>

      {/* KPI cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4">
        <Card className="bg-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet className="h-4 w-4" /> Total Investment
            </CardTitle>
            <CardDescription>Total principal invested</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{currency(totalInvested)}</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IndianRupee className="h-4 w-4" /> Monthly SIP
            </CardTitle>
            <CardDescription>Recurring per month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{currency(totalSip)}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 bg-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" /> Current Value & Return
            </CardTitle>
            <CardDescription>Portfolio performance</CardDescription>
          </CardHeader>
          <CardContent className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">{currency(totalCurrent)}</p>
            <span
              className={`text-sm font-medium ${
                overallPct >= 0 ? "text-green-600" : "text-rose-600"
              }`}
            >
              {overallPct >= 0 ? "+" : ""}
              {overallPct.toFixed(1)}%
            </span>
          </CardContent>
        </Card>
      </section>

      {/* List by type */}
      <section>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            {uniqueTypes.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All */}
          <TabsContent value="all" className="mt-4">
            <InvestmentList items={data} />
          </TabsContent>

          {/* By Type */}
          {uniqueTypes.map((t) => (
            <TabsContent key={`tab-${t}`} value={t} className="mt-4">
              <InvestmentList items={data.filter((d) => d.type === t)} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
}

function InvestmentList({ items }: { items: Investment[] }) {
  if (!items.length) {
    return (
      <div className="rounded-lg border bg-card/60 p-4 text-center text-sm text-muted-foreground">
        No investments found.
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card/60">
      <div className="hidden grid-cols-[1.2fr_.8fr_.8fr_.6fr] items-center gap-3 px-3 py-2 text-xs text-muted-foreground sm:grid">
        <div>Name</div>
        <div>Invested</div>
        <div>Current</div>
        <div>Return</div>
      </div>
      <div className="divide-y">
        {items.map((d) => {
          const changePct = pct(d.amountInvested, d.currentValue);
          return (
            <div
              key={d.id}
              className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-3 sm:grid-cols-[1.2fr_.8fr_.8fr_.6fr]"
            >
              {/* Name & type */}
              <div>
                <div className="text-sm font-medium leading-tight">
                  {d.name}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded-full border px-2 py-0.5">
                    {d.type}
                  </span>
                  <span>
                    Started{" "}
                    {new Date(d.startDate).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {typeof d.sipPerMonth === "number" && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                      SIP {currency(d.sipPerMonth)}
                    </span>
                  )}
                </div>
              </div>

              {/* Invested (sm+) */}
              <div className="hidden sm:block text-sm font-medium">
                {currency(d.amountInvested)}
              </div>

              {/* Current (sm+) */}
              <div className="hidden sm:block text-sm font-medium">
                {currency(d.currentValue)}
              </div>

              {/* Return */}
              <div className="text-right text-sm font-semibold sm:text-left">
                <span
                  className={
                    changePct >= 0 ? "text-green-600" : "text-rose-600"
                  }
                >
                  {changePct >= 0 ? "+" : ""}
                  {changePct.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
