import { Chip } from "@nextui-org/chip";
import { ReactElement } from "react";

interface MiniCardProps {
  desc: string;
  icon?: ReactElement;
  type?: "date";
  day?: string;
}

const MiniCard = (props: MiniCardProps) => {
  const { desc, icon, type, day } = props;

  return (
    <a
      href="#"
      className="transition-all duration-300 relative my-1 flex items-center gap-2 overflow-hidden rounded-lg bg-white sm:p-8 lg:p-6"
    >
      <span className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-purple-300 via-blue-500 to-purple-600"></span>

      {icon}
      <div>
        <p className="text-xl text-secondary">{day}</p>
        <p className="text-sm text-gray-500 font-medium">{desc}</p>
      </div>
      {type === "date" && (
        <Chip size="sm" color="secondary" className="relative left-10">
          Today
        </Chip>
      )}
    </a>
  );
};

export default MiniCard;
