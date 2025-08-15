import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="border-t border-foreground/20">
      <MaxWidthWrapper className="flex justify-between items-center p-4">
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl tracking-tight">Belanjaorek</h2>
          <div className="text-xs tracking-wide w-96 mt-4 opacity-90">
            <p>Dengan belanjaorek, temukan digital assets impian anda</p>
            <p>Dengan berbagai pilihan assets, dengan kualitas Premium</p>
            <p>Integrasi sistem Yang Modern, dengan Belajaorek!</p>
          </div>
          <div className="flex gap-2 mt-8">
            <Button
              variant={"default"}
              size={"icon"}
              className="rounded-full bg-foreground">
              <FaGithub />
            </Button>
            <Button
              variant={"default"}
              size={"icon"}
              className="rounded-full bg-foreground">
              <FaLinkedin />
            </Button>
            <Button
              variant={"default"}
              size={"icon"}
              className="rounded-full bg-foreground">
              <FaTwitter />
            </Button>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Category</h2>
            <div className="flex flex-col text-sm font-light gap-1">
              <p>Icons</p>
              <p>Game Assets</p>
              <p>SFX</p>
              <p>SAMP Skins</p>
              <p>3D Models</p>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <div className="flex flex-col text-sm font-light gap-1">
              <p>Account Status</p>
              <p>Profile</p>
              <p>Liked Products</p>
              <p>Reports</p>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <div className="flex flex-col text-sm font-light gap-1">
              <p>Blog</p>
              <p>Marketplace</p>
              <p>About</p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="w-full py-2 text-center">
        <p className="text-xs font-extralight">
          Made By <code>KINGDimsSKy</code> © 2025 All right Reserved.
        </p>
      </div>
    </div>
  );
}
