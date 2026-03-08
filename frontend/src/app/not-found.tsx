import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#FAF1E3] p-4 text-center">
      <div className="max-w-[500px] flex flex-col items-center space-y-8">
        <img
          src="/assets/coffee.png"
          alt="Coffee Cat"
          className="h-[200px] w-auto object-contain opacity-80"
        />
        
        <div className="space-y-4">
          <h1 className="text-[72px] font-bold font-serif text-[#88642A] leading-none">
            404
          </h1>
          <h2 className="text-[24px] font-bold font-serif text-[#857139]">
            Whoops! This page took a coffee break
          </h2>
          <p className="text-[16px] font-normal font-sans text-[#957139] leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a secret notebook.
          </p>
        </div>

        <Link href="/">
          <Button variant="action" className="w-[180px]">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
