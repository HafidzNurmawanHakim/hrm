import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import React from "react";

interface AvatarGroups {
   width?: string;
   max?: number;
}

const AvatarGroups = (props: AvatarGroups) => {
   const { width, max } = props;
   return (
      <AvatarGroup size="sm" isBordered max={max ?? 3}>
         <Avatar
            className="w-6 h-6 text-tiny"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
         />
         <Avatar
            className="w-6 h-6 text-tiny"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
         />
         <Avatar
            className="w-6 h-6 text-tiny"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
         />
         <Avatar
            className="w-6 h-6 text-tiny"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
         />
         <Avatar
            className="w-6 h-6 text-tiny"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
         />
         <Avatar
            className="w-6 h-6 text-tiny"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
         />
      </AvatarGroup>
   );
};

export default AvatarGroups;
