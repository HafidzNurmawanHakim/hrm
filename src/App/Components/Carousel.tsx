import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import ChevronLeftIcon from "../../Assets/Icons/ChevronLeftIcon";
import ChevronRightIcon from "../../Assets/Icons/ChevronRightIcon";

const { REACT_APP_BASE_URL } = process.env;

interface CarouselProps {
   children: ReactElement[];
   index: number;
   setIndex: Dispatch<SetStateAction<number>>;
}

export default function Carousel({ children, index, setIndex }: CarouselProps) {
   return (
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
         <div className="h-full">
            <div className="mx-auto flex h-full max-w-7xl flex-col  justify-center">
               <div className="relative overflow-hidden">
                  <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
                     {children.map((item, i) => {
                        return item;
                     })}
                  </motion.div>
                  <AnimatePresence initial={false}>
                     {index > 0 && (
                        <motion.button
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 0.7 }}
                           exit={{ opacity: 0, pointerEvents: "none" }}
                           whileHover={{ opacity: 1 }}
                           className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                           onClick={() => setIndex(index - 1)}
                        >
                           <ChevronLeftIcon />
                        </motion.button>
                     )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                     {index + 1 < children.length && (
                        <motion.button
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 0.7 }}
                           exit={{ opacity: 0, pointerEvents: "none" }}
                           whileHover={{ opacity: 1 }}
                           className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                           onClick={() => setIndex(index + 1)}
                        >
                           <ChevronRightIcon />
                        </motion.button>
                     )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </MotionConfig>
   );
}
