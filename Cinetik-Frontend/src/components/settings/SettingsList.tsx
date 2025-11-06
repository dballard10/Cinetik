interface SettingsListProps {
  selectedSetting: number | null;
  setSelectedSetting: (setting: number) => void;
}

const SettingsList = ({
  selectedSetting,
  setSelectedSetting,
}: SettingsListProps) => {
  const settings = [
    {
      id: 1,
      name: "General",
    },
    {
      id: 2,
      name: "Account",
    },
    {
      id: 3,
      name: "Appearance",
    },
    {
      id: 4,
      name: "Notifications",
    },
    // {
    //   id: 5,
    //   name: "Privacy",
    // },
    {
      id: 5,
      name: "Help",
    },
  ];
  return (
    <div>
      <ul className="space-y-2">
        {settings.map((setting) => (
          <button
            key={setting.id}
            className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 w-full ${
              selectedSetting === setting.id ? "bg-white/20" : "bg-white/10"
            }`}
            onClick={() => setSelectedSetting(setting.id)}
          >
            {setting.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default SettingsList;
