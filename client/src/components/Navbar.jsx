import React from "react";
import YourSvg from "/assets/google.svg";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const loginWithGithub = async () => {};
  return (
    <>
      <div className="w-full flex justify-center items-center p-4">
        <div className="w-full sm:w-[90%] rounded-lg h-16 border-[2px] flex items-center justify-between px-2 sm:px-4 py-2">
          <div className="h-full flex justify-center items-center">
            <p className="text-3xl text-text font-semibold font-pops">
              KYC<span className="text-highlight"> Master</span>
            </p>
          </div>
          <div className="h-full flex gap-2 justify-center items-center sm:gap-5">
            {/* {!session ? ( */}
            <>
              <Button size={"sm"} onClick={loginWithGithub}>
                <img src={YourSvg} alt="Github" className="h-5 w-5 mr-1" />

                <p className="sm:after:content-[' with Github'] font-pops">
                  Login
                </p>
              </Button>
            </>
            {/* ) : (
              <>
                <div className="flex gap-2 items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={user?.avatar_url}
                          alt="avatar"
                          width={30}
                          height={30}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user?.full_name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    size={"sm"}
                    onClick={logout}
                    variant={"outline"}
                    className="border-none rounded-full p-2"
                  >
                    <LogOut className="h-5 w-5" strokeWidth={"1.25px"} />
                  </Button>
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
