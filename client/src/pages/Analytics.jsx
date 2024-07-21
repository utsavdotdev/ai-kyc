import React, { useContext, useEffect, useState } from "react";
import {
  Activity,
  CreditCard,
  BookText,
  Users,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import Charts from "../components/Charts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "../config/axios";

import { ContextProvider } from "../config/Context";

const Analytics = () => {
  const [info, setInfo] = useState();
  const { user } = useContext(ContextProvider);

  useEffect(() => {
    getInsights();
  }, [user]);

   const getInsights = async () => {
     try {
       const res = await axios.get(`/form/getinfo/${user?._id}`);
       setInfo(res.data.insights);
     } catch (error) {
       console.log(error);
     }
   };
  return (
    <>
      <div className="grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Analytics</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <BookText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{info?.formCount}</div>
            <p className="text-xs text-muted-foreground">
              {info?.activeForms +
                " Active & " +
                info?.inactiveForms +
                " Inactive"}
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{info?.userCount}</div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified User</CardTitle>
            <UserRoundCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{info?.verifiedUsers}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected User</CardTitle>
            <UserRoundX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{info?.rejectedUsers}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Graph</CardTitle>
              <CardDescription>
                Observation of Verified and Rejected Users
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Charts info={info}/>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent User</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {info?.latestUsers.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <p className="text-lg text-muted-foreground">No Recent users</p>
              </div>
            ) : (
              info?.latestUsers.map((user, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>
                      {
                        user?.name.split(" ").map((name) => name[0])
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{user?.status}</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Analytics;
