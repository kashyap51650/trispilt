import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const AvatarUpload: React.FC<{
  avatar: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}> = ({ avatar, onAvatarChange, fileInputRef }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Image
          src={avatar}
          height={80}
          width={80}
          alt="Profile photo"
          className="rounded-full h-20 w-20 border-2 border-gray-200"
        />
        <Button
          type="button"
          className="absolute bottom-0 right-0 flex rounded-full bg-primary p-2 h-7 w-7"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change profile photo"
        >
          <PencilIcon className="w-5 h-5" />
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onAvatarChange}
      />
    </div>
  );
};

export default AvatarUpload;
