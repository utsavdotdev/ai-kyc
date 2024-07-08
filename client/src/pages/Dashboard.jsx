import Forms from "../components/Forms";
import { Button } from "@/components/ui/button";
import React from "react";

const Dashboard = () => {
  return (
    <>
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Forms</h1>
      </div>
      <div
        className="flex flex-1 h-[80vh] items-center justify-center rounded-lg border border-dashed shadow-sm"

        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no forms
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start creating form as soon as possible
          </p>
          <Button className="mt-4">Create Forms</Button>
        </div>
      </div> */}

      <Forms />
    </>
  );
};

export default Dashboard;
