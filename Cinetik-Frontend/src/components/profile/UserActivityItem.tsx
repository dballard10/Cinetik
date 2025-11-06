import { Link } from "react-router-dom";

interface UserActivityItemProps {
  profileImage: string;
  action: string;
  contentName: string;
  contentLink?: string;
  timeAgo: string;
}

const UserActivityItem = ({
  profileImage,
  action,
  contentName,
  contentLink,
  timeAgo,
}: UserActivityItemProps) => {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
      <img src={profileImage} alt="" className="w-10 h-10 rounded-full" />
      <div>
        <p>
          <span className="font-semibold">You</span> {action}{" "}
          {contentLink ? (
            <Link
              to={contentLink}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {contentName}
            </Link>
          ) : (
            <span className="text-purple-400">{contentName}</span>
          )}
        </p>
        <p className="text-sm text-gray-400">{timeAgo}</p>
      </div>
    </div>
  );
};

export default UserActivityItem;
