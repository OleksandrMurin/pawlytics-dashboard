import Like from "@public/like.svg";
import LoginIcon from "@public/login-icon.svg";
import Logo from "@public/logo.svg";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";
import { AddRecipeButton } from "../controls/buttons/AddRecipeButton";

const Header: FC = () => {
  const t = useTranslations("Header");

  return (
    <header className="bg-black text-cream400 opacity-70 fixed w-full top-0 left-0 right-0 z-50">
      <div className="container flex items-center justify-between h-[72px] ">
        <Logo />
        <nav className="flex items-center justify-between gap-7 uppercase text-xl">
          <AddRecipeButton size="md" />
          <Link href="/" className="custom-border">
            {t("Home")}
          </Link>
          <Link href="/recipes">{t("All recipes")}</Link>
          <Link href="/my_recipes">{t("My recipes")}</Link>
        </nav>
        <div className="flex items-center justify-between">
          <Link href="/favorites" className="">
            <Like className="m-2" />
          </Link>

          <LoginIcon className="m-2" />
          <Link href="/auth/login" className="uppercase text-xl">
            {t("Sign in")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
