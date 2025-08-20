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
  width?: number;
  height?: number;
}

const AppAvatar: React.FC<AppAvatarProps> = ({
  src,
  fallback,
  width = 40,
  height = 40,
}) => {
  return (
    <Avatar>
      <AvatarImage
        src={src}
        width={width}
        height={height}
        className="rounded-full"
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
