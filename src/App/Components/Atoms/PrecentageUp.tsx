import ArrowStatUpicon from "../../../Assets/Icons/ArrowStatUpIcon";

interface PrecentageUp {
   precentage: string | number;
   desc: string;
}

const PrecentageUp = (props: PrecentageUp) => {
   const { precentage, desc } = props;
   return (
      <div className="mt-1 flex gap-1 text-green-600">
         <ArrowStatUpicon />

         <p className="flex gap-2 text-xs flex items-center">
            <span className="font-medium text-xl">{precentage}</span>
            <span className="text-gray-500 text-sm">{desc}</span>
         </p>
      </div>
   );
};

export default PrecentageUp;
