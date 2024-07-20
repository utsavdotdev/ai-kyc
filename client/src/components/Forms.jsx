import React, { useContext, useEffect, useState } from "react";
import { File, ListFilter, MoreHorizontal, PlusIcon } from "lucide-react";

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
import CreateForm from "./CreateForm";
import ShareLink from "./ShareLink";
import axios from "../config/axios";
import toast from "react-hot-toast";

const Forms = ({ myForm }) => {
  const [loading, setLoading] = useState(false);
  const deleteForm = async (formId) => {
    try {
      const res = await axios.delete(`/form/deleteForm/${formId}`);
      if (res.status === 200) {
        toast.success("Form deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting form");
    }
  };

  const updateStatus = async (formId) => {
    try {
      const res = await axios.patch(`/form/updateStatus/${formId}`);
      if (res.status === 200) {
        toast.success("Form status updated");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating form status");
    }
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
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
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateForm />
        </div>
      </div>
      <TabsContent value="active">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Forms</CardTitle>
            <CardDescription>
              Manage your forms and view their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell p-0">
                    Filled by (users)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Form Link
                  </TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myForm
                  .filter((form) => form.status)
                  .map((form) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {form.formName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {form.status ? "Active" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {form?.users?.length}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {form.createdAt}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <ShareLink link={form?.link} />
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
                            <DropdownMenuItem
                              onClick={() => updateStatus(form?._id)}
                            >
                              {form?.status ? "Inactive" : "Active"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteForm(form?._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{myForm?.length}</strong>
              forms
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="draft">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Forms</CardTitle>
            <CardDescription>
              Manage your forms and view their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell p-0">
                    Filled by (users)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Form Link
                  </TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myForm
                  .filter((form) => !form.status)
                  .map((form) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {form.formName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {form.status ? "Active" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {form?.users?.length}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {form.createdAt}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <ShareLink link={form?.link} />
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
                            <DropdownMenuItem
                              onClick={() => updateStatus(form?._id)}
                            >
                              {form?.status ? "Inactive" : "Active"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteForm(form?._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{myForm?.length}</strong>
              forms
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Forms</CardTitle>
            <CardDescription>
              Manage your forms and view their status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell p-0">
                    Filled by (users)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Form Link
                  </TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myForm.map((form) => (
                  <TableRow>
                    <TableCell className="font-medium">
                      {form.formName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {form.status ? "Active" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {form?.users?.length}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {form.createdAt}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <ShareLink link={form?.link} />
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
                          <DropdownMenuItem
                            onClick={() => updateStatus(form?._id)}
                          >
                            {form?.status ? "Inactive" : "Active"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteForm(form?._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {/* here */}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{myForm?.length}</strong>
              forms
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Forms;
