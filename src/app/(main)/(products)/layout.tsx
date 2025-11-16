import TopBannerComponents from "@/components/sharedComponents/Top-Banner";

export default function ProductsPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <TopBannerComponents />
      {children}
    </div>
  );
}
