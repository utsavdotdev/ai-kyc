import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MdOutlineMobileFriendly, MdOutlineLock } from "react-icons/md";
import { PiFastForwardBold } from "react-icons/pi";
import { TbClockHour4 } from "react-icons/tb";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { IoCloudDoneOutline } from "react-icons/io5";

const cardData = [
  {
    icon: <MdOutlineLock size={30} />,
    title: "Secure Process",
    description:
      "The entire process is handled by a machine learning model, ensuring greater security.",
  },
  {
    icon: <PiFastForwardBold size={30} />,
    title: "Fast",
    description: "It processes all required documents quickly.",
  },
  {
    icon: <RiMoneyCnyCircleLine size={30} />,
    title: "Cost Effective",
    description:
      "It eliminates the need for human involvement, saving on human resource costs.",
  },
  {
    icon: <IoCloudDoneOutline size={30} />,
    title: "Real-Time Process",
    description: "It analyzes user faces and verifies documents instantly.",
  },
  {
    icon: <MdOutlineMobileFriendly size={30} />,
    title: "User Friendly",
    description: "KYC master is user friendly and easy to use.",
  },
  {
    icon: <TbClockHour4 size={30} />,
    title: "24/7 Availability",
    description:
      "The AI model operates continuously, providing 24/7 service without downtime.",
  },
];

const Hero = () => {
  return (
    <div className="dark text-white">
      <main>
        <section className="container mx-auto py-24 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold ">
              Simplify KYC with AI.
            </h1>
            <p className="text-lg text-muted-foreground">
              Effortlessly verify your customers' identities with our AI-driven
              KYC solution. Start in minutes with our straightforward API
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
              User friendly KYC process with KYC master
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform empowers you to verify your users easily with AI
              powered verification system.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {cardData.map((card, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col gap-4 py-3">
                  {card.icon}
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-[#141414] py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; Made with 💖 by
            <a target="_blank" href="https://twitter.com/rajeshkhadka200">
              {" "}
              Rajesh{" "}
            </a>
            &{" "}
            <a target="_blank" href="https://twitter.com/utsavdotdev">
              {" "}
              Utsav{" "}
            </a>
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
  );
};

export default Hero;
