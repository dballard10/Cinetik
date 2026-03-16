import { platforms } from "@/data/platforms";
import Platform from "./Platform";

const PlatformList = () => {
  return (
    <div className="flex flex-col gap-2">
      {platforms.map((platform) => (
        <Platform
          key={platform.provider_id}
          id={platform.provider_id}
          name={platform.provider_name}
        />
      ))}
    </div>
  );
};

export default PlatformList;
