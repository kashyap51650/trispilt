import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CURRENT_YEAR, MONTHLY_CONTRIBUTION_AMOUNT } from "@/constants";
import Image from "next/image";

type ConfirmContributionProps = {
  month: string;
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmContribution: React.FC<ConfirmContributionProps> = ({
  month,
  show,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={true}
    >
      <DialogContent onCloseAutoFocus={onClose} className="sm:max-w-[200px]">
        <div className="flex justify-center m-4">
          <Image src={"/rupee.png"} width={50} height={50} alt="rupee-image" />
        </div>
        <DialogHeader className="text-start">
          <DialogTitle className="text-md">{`Contribute ₹${MONTHLY_CONTRIBUTION_AMOUNT} for ${month} - ${CURRENT_YEAR} ?`}</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed with this contribution?
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onConfirm}>Contribute</Button>
      </DialogContent>
    </Dialog>
  );
};
