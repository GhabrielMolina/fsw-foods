"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();
  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn("google");

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px] ">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex items-center gap-3 pt-6">
                <Avatar>
                  <AvatarImage src={data?.user?.image as string | undefined} />
                  <AvatarFallback>
                    {data?.user?.name?.split(" ")[0][0]}
                    {data?.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{data?.user?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {data?.user?.email}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button className="w-full justify-start space-x-3 text-sm font-normal ">
              <HomeIcon size={16} />
              <span>Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal "
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span>Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal "
                >
                  <HeartIcon size={16} />
                  <span>Restaurantes favoritos</span>
                </Button>
              </>
            )}

            <div className="py-6">
              <Separator />
            </div>

            {data?.user && (
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 text-sm font-normal "
                onClick={handleSignOutClick}
              >
                <LogOutIcon size={16} />
                <span>Sair da conta</span>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
