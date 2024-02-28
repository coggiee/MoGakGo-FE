"use client";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";

interface StackNavigatorProps {
  content: React.ReactNode;
}

function StackNavigator({ content }: StackNavigatorProps) {
  const router = useRouter();

  const handleClickPrevButton = () => {
    router.back();
  };

  return (
    <div>
      <div className="m-2 flex justify-between p-2 py-6">
        <IconChevronLeft
          role="button"
          className="min-w-[10%]"
          onClick={handleClickPrevButton}
        />
        <h1 className="text-xl font-semibold">{content}</h1>
        <div className="min-w-[10%]"></div>
      </div>
    </div>
  );
}
export default StackNavigator;