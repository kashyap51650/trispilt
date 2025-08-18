import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarImageProps,
} from "@radix-ui/react-avatar";
import React from "react";

interface AppAvatarProps {
  src: string;
  fallback?: string;
}

const AppAvatar: React.FC<AppAvatarProps> = ({ src, fallback }) => {
  return (
    <Avatar>
      <AvatarImage src={src} width={40} height={40} className="rounded-full" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
