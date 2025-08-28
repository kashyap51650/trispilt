"use client";
import AppAvatar from "@/components/AppAvatar";
import AppCard from "@/components/AppCard";
import Loading from "@/components/Loading";
import ProfileMenuItem from "@/components/ProfileMenuItem";
import { NO_PROFILE_IMAGE } from "@/constants";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useLogout } from "@/hooks/useLogOut";
import { CoinsIcon, OutdentIcon, Presentation, User2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  const { user, loading } = useAuthUser();
  const { handleLogOut } = useLogout();

  console.log("User data:", user);

  if (loading) return <Loading />;
  if (!user) return <p>No user signed in</p>;

  return (
    <div className="space-y-4">
      {/* Enhanced User Avatar + Info */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br bg-primary-foreground rounded-3xl" />
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />

        <div className="relative flex flex-col gap-6 items-center justify-center py-8 px-6">
          <div className="relative group">
            {/* Avatar glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative transform group-hover:scale-105 transition-all duration-300">
              <AppAvatar
                src={user.avatar !== "" ? user.avatar : NO_PROFILE_IMAGE}
                width={100}
                height={100}
              />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="font-bold text-2xl text-white">{user.name}</h3>
            <p className="text-muted-foreground font-medium">{user.email}</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
                <span className="text-xs font-semibold text-green-400">
                  Verified Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Balance Card */}
      <AppCard className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white shadow-xl border-0 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3">
              <Image
                src="/3dicons-wallet.png"
                width={50}
                height={50}
                alt="Balance Icon"
                className="filter brightness-0 invert"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-black text-3xl">₹ 56,000</span>
            </div>
            <span className="text-white/80 text-sm font-medium">
              Since 1 year 2 months
            </span>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-white/90">
                  +12.5%
                </span>
              </div>
            </div>
          </div>
        </div>
      </AppCard>

      {/* Menu Items */}
      {/* <AppCard className="p-2"> */}
      <ul className="space-y-2">
        <ProfileMenuItem
          icon={<User2Icon className="h-5 w-5" />}
          label="Profile Settings"
          onClick={() => router.push("/edit-profile")}
        />
        <ProfileMenuItem
          icon={<CoinsIcon className="h-5 w-5" />}
          label="Contribution Details"
          onClick={() => router.push("/contributions")}
        />
        <ProfileMenuItem
          icon={<Presentation className="h-5 w-5" />}
          label="Financial Reports"
          onClick={() => router.push("/reports")}
        />
        <ProfileMenuItem
          icon={<OutdentIcon className="h-5 w-5" />}
          label="Logout"
          onClick={handleLogOut}
        />
      </ul>
      {/* </AppCard> */}
    </div>
  );
};

export default ProfilePage;
