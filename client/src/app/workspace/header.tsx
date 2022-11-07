import Image from "next/image";
import Link from "next/link";
import React from "react";

export type LinkItemProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export const LinkItem: React.FC<LinkItemProps> = ({ href, label, icon = null }) => {
  return (
    <div className="relative w-20">
      <Link
        href={`/workspace/${href}`}
        data-testid={`link-${label.toLowerCase()}`}
      >
        <div className={`${"flex justify-center items-center hover:underline"}
    ${"before:absolute before:left-1/2 before:bottom-0 before:w-0 before:border-b-2 before:border-black before:-translate-x-1/2 before:hover:animate-spread"}`}>
          {icon}
          <p className="text-lg font-zen">{label}</p>
        </div>
      </Link>
    </div>
  );
};


export type HeaderProps = {};

const links = [
  {
    href: "/task",
    label: "Task",
  },
  {
    href: "/dashboard",
    label: "MyPage",
  },
];

interface Props {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | undefined
}

export const Header = ({ user }: Props) => {
  return (
    <div className="sticky top-0 z-40 w-full flex h-16 p-2 bg-[#F1F1EF] border-b-2 border-gray-200 shadow-lg px-4">
      <div className="mx-4">
        <Link href={`/`}></Link>
      </div>
      <div className="flex-[0.1]"></div>
      <nav className="flex justify-start items-center gap-4 h-12">
        {links.map(link => (
          <LinkItem key={link.label} {...link} />
        ))}
      </nav>
      <div className="flex-1"></div>
      <div className={`flex justify-center`}>
        <Image src={user?.image!} width="44" height="44" alt="user_image" className="rounded-full" />
      </div>
      <div className="flex-[0.2]"></div>
    </div>
  );
}
