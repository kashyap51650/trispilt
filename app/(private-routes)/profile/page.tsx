"use client";
import AppAvatar from "@/components/AppAvatar";
import AppCard from "@/components/AppCard";
import ProfileMenuItem from "@/components/ProfileMenuItem";
import { CoinsIcon, OutdentIcon, Presentation, User2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      {/* User Avatar + Info */}
      <div className="flex flex-col gap-4 items-center justify-center py-6">
        <AppAvatar src="/uiface-1.jpg" width={100} height={100} fallback="CR" />
        <div className="text-center">
          <h3 className="font-bold text-2xl">Chirag Rathva</h3>
          <p className="text-muted">+91 9428551650</p>
        </div>
      </div>

      {/* Balance Card */}
      <AppCard className="bg-white flex-0 gap-4">
        <div className="flex">
          <Image
            src="/3dicons-wallet.png"
            width={60}
            height={60}
            alt="Balance Icon"
            className="mr-4"
          />

          <div className="flex flex-col justify-center">
            <span className="text-primary-foreground font-black text-2xl mr-2">
              ₹ 56,000
            </span>
            <span className="text-card text-sm">Since 1 year 2 months</span>
          </div>
        </div>
      </AppCard>

      {/* Menu Items */}
      <AppCard className="px-2">
        <ul className="divide-y divide-border">
          <ProfileMenuItem icon={<User2Icon />} label="Profile Setting" />
          <ProfileMenuItem
            icon={<CoinsIcon />}
            label="Contribution Details"
            onClick={() => router.push("/contributions")}
          />
          <ProfileMenuItem icon={<Presentation />} label="Reports" />
          <ProfileMenuItem
            icon={<OutdentIcon />}
            label="Logout"
            onClick={() => router.push("/login")}
          />
        </ul>
      </AppCard>
    </div>
  );
};

export default ProfilePage;
