import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <>
      <div className="dark text-white">
        <main>
          <section className="container mx-auto py-24 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold ">
                Simplify KYC with AI.
              </h1>
              <p className="text-lg text-muted-foreground">
                Easily verify your customers' identities with our AI-powered KYC
                solution. Get started in minutes with our simple API
                integration.
              </p>
              <div className="flex gap-4">
                <Button>Get Started</Button>
                <Button variant="secondary">Learn More</Button>
              </div>
            </div>
            <img
              src="/hero.png"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-full object-cover sm:w-[500px] lg:order-last lg:aspect-square"
            />
          </section>
          <section className="container mx-auto py-24 px-4 md:px-6">
            <div className="space-y-6 text-center">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                User firendly KYC process with KYC master
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our platform empowers you to verify your users easily with AI
                powered verification system.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardContent className="flex flex-col gap-4 py-3">
                  <LayersIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Secure Process</h3>
                  <p className="text-muted-foreground">
                    All the task is done by meachine learning model which is
                    more secure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-4 py-3">
                  <CodeIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Fast</h3>
                  <p className="text-muted-foreground">
                    It process all the required document in very less amount of
                    time due to which it is a fast process.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-4 py-3">
                  <LockIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Cost Effective</h3>
                  <p className="text-muted-foreground">
                    It doesnot require any human involvation, it saves cost in
                    human resources.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-4 py-3">
                  <BoltIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Real-Time Process</h3>
                  <p className="text-muted-foreground">
                    It proces the usr face abd verify the documents in the
                    realtime.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-4 py-3">
                  <GaugeIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">User Friendly</h3>
                  <p className="text-muted-foreground">
                    KYC master is user friendly and easy to use.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-4 py-3">
                  <BriefcaseIcon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Enterprise-Grade</h3>
                  <p className="text-muted-foreground">
                    Our platform is trusted by the world's leading enterprises
                    to power their mission-critical applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <footer className="bg-[#141414] py-8 px-4 md:px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 kyc master. All rights reserved.
            </p>
            <nav className="flex items-center gap-6">
              <div className="text-sm font-medium hover:text-primary">
                Terms of Service
              </div>
              <div className="text-sm font-medium hover:text-primary">
                Privacy Policy
              </div>
              <div className="text-sm font-medium hover:text-primary">
                Contact Us
              </div>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
};

function BoltIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function GaugeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function LayersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default Hero;
