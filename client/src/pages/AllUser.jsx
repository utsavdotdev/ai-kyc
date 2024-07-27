import React, { useEffect, useState } from "react";
import { File, ListFilter, MoreHorizontal } from "lucide-react";
import myaxios from "../config/axios.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AllUser = () => {
  const [users, setusers] = useState();
  // fetch the data of user whose formid is req.params.formId axios only
  useEffect(() => {
    const fetchData = async () => {
      const formId = window.location.pathname.split("/")[2];
      const res = await myaxios.get(`/user/getspecificfromuser/${formId}`);
      setusers(res.data);
    };
    fetchData();
  }, []);
  console.log(users);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Verified</TabsTrigger>
          <TabsTrigger value="draft">Rejected</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Verified
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Rejected</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />{" "}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage your users and view their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    Photo
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead className="hidden md:table-cell">Price</TableHead> */}
                  {/* <TableHead className="hidden md:table-cell">
                    Total Sales
                  </TableHead> */}
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((data, ind) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell className="hidden lg:table-cell">
                          <img
                            style={{
                              outline: "2px solid #e5e7eb",
                              borderRadius: "50%",
                            }}
                            alt="imgs"
                            className="aspect-square rounded-md object-cover"
                            height="80"
                            src={`https://aikyc-api.onrender.com/${data?.details?.images?.face}`}
                            width="80"
                          />
                        </TableCell>
                        <TableCell className="font-medium lg:table-cell">
                          {data?.details?.personalDetail?.firstName + " "}
                          {data?.details?.personalDetail?.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{data?.status}</Badge>
                        </TableCell>
                        {/* <TableCell className="hidden md:table-cell">
                          $199.99
                        </TableCell> */}
                        {/* <TableCell className="hidden md:table-cell">
                          30
                        </TableCell> */}
                        <TableCell className="hidden md:table-cell">
                          {data?.createdAt}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AllUser;
