import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardSkeleton = () => {
  return (
    <div
      className="bg-light-card dark:bg-dark-card  shadow-sm overflow-hidden rounded-lg flex flex-col p-4 items-center
      shadow-light-shadow dark:shadow-dark-shadow"
    >
      <div className="w-full aspect-square rounded-lg ">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="w-full flex flex-col items-center">
        {/* name */}
        <h3 className="pt-3 w-2/3">{<Skeleton count={1} />}</h3>
        {/* location */}
        <h3 className="pt-3 pb-3 w-full">{<Skeleton count={1} />}</h3>
        {/* description */}
        <p className="w-full">{<Skeleton count={11} />}</p>
        <button className="mt-auto px-4 w-1/3 ">{<Skeleton />}</button>
      </div>
    </div>
  );
};
