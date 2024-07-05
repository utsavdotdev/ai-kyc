import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const Setting = () => {
  return (
    <>
      <div className="grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="grid w-full max-w-6xl items-start gap-6">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Organization Name</CardTitle>
              <CardDescription>Used to identify your org.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Infotech" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Delete Your Account</CardTitle>
              <CardDescription>
                This will permanently delete your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include" />
                  <label
                    htmlFor="include"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I understand the consequences
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Setting;
