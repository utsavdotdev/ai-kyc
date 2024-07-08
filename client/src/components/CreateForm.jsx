import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const CreateForm = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusIcon className="h-3.5 w-3.5" />{" "}
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Form
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create form profile</DialogTitle>
          <DialogDescription>Make your ai powered kyc form</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Form Name
            </Label>
            <Input
              id="name"
              defaultValue="Info tech KYC Form"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label className="text-base">Include Pesonal Details</label>
              </div>
              <Switch checked={true} disabled aria-readonly />
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label className="text-base">Include Location Details</label>
              </div>
              <Switch
                checked={checked}
                onCheckedChange={(checked) => setChecked(checked)}
                aria-readonly
              />
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <label className="text-base">
                  Include Ai Powered Face and docs scan
                </label>
              </div>
              <Switch checked={true} disabled aria-readonly />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Form</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
