import { Navigation } from "@/components/page-components/Navigation";
import SettingsList from "@/components/settings/SettingsList";
import { useState } from "react";

// Settings content components
const GeneralSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">General Settings</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Language</label>
        <select className="bg-gray-800 border border-gray-700 rounded-lg p-2 w-full">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Time Zone</label>
        <select className="bg-gray-800 border border-gray-700 rounded-lg p-2 w-full">
          <option>UTC (GMT+0)</option>
          <option>Eastern Time (GMT-5)</option>
          <option>Pacific Time (GMT-8)</option>
          <option>Central European Time (GMT+1)</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="autoplay"
          className="rounded bg-gray-800 border-gray-700"
        />
        <label htmlFor="autoplay">Enable autoplay for trailers</label>
      </div>
    </div>
  </div>
);

const AccountSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Account Settings</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="your.email@example.com"
          className="bg-gray-800 border border-gray-700 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Change Password
        </label>
        <input
          type="password"
          placeholder="Current password"
          className="bg-gray-800 border border-gray-700 rounded-lg p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="New password"
          className="bg-gray-800 border border-gray-700 rounded-lg p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="bg-gray-800 border border-gray-700 rounded-lg p-2 w-full"
        />
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
        Save Changes
      </button>
    </div>
  </div>
);

const AppearanceSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Appearance Settings</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Theme</label>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="h-24 w-24 rounded-lg bg-gray-900 border border-gray-700 mb-2 flex items-center justify-center">
              <span className="text-xs">Dark</span>
            </div>
            <input type="radio" name="theme" defaultChecked />
          </div>
          <div className="text-center">
            <div className="h-24 w-24 rounded-lg bg-gray-200 border border-gray-300 mb-2 flex items-center justify-center">
              <span className="text-xs text-gray-800">Light</span>
            </div>
            <input type="radio" name="theme" />
          </div>
          <div className="text-center">
            <div className="h-24 w-24 rounded-lg bg-gradient-to-b from-blue-900 to-purple-900 border border-gray-700 mb-2 flex items-center justify-center">
              <span className="text-xs">Custom</span>
            </div>
            <input type="radio" name="theme" />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Font Size</label>
        <input
          type="range"
          min="1"
          max="5"
          defaultValue="3"
          className="w-full"
        />
        <div className="flex justify-between text-xs">
          <span>Small</span>
          <span>Medium</span>
          <span>Large</span>
        </div>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Notification Settings</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Email Notifications</h4>
          <p className="text-sm text-gray-400">
            Get notifications about new releases and recommendations
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Push Notifications</h4>
          <p className="text-sm text-gray-400">
            Get notified when movies you're watching are available
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Marketing</h4>
          <p className="text-sm text-gray-400">
            Receive updates about special offers and promotions
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
    </div>
  </div>
);

const HelpSettings = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold">Help & Support</h3>
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="font-medium mb-2">Frequently Asked Questions</h4>
        <ul className="space-y-2 text-gray-300">
          <li className="cursor-pointer hover:text-white">
            How do I reset my password?
          </li>
          <li className="cursor-pointer hover:text-white">
            Can I download movies for offline viewing?
          </li>
          <li className="cursor-pointer hover:text-white">
            How do I update my payment method?
          </li>
          <li className="cursor-pointer hover:text-white">
            What devices can I watch on?
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-medium mb-2">Contact Support</h4>
        <p className="text-sm text-gray-400 mb-2">
          Having trouble? Our support team is here to help.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
          Contact Support
        </button>
      </div>
      <div>
        <h4 className="font-medium mb-2">System Information</h4>
        <p className="text-sm text-gray-400">Version: 1.0.0</p>
        <p className="text-sm text-gray-400">Build: 20240801</p>
      </div>
    </div>
  </div>
);

const SettingsPage = () => {
  const [selectedSetting, setSelectedSetting] = useState<number>(1);

  // Render the appropriate settings panel based on selection
  const renderSettingsContent = () => {
    switch (selectedSetting) {
      case 1:
        return <GeneralSettings />;
      case 2:
        return <AccountSettings />;
      case 3:
        return <AppearanceSettings />;
      case 4:
        return <NotificationSettings />;
      case 5:
        return <HelpSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>
        <main className="flex flex-col md:flex-row gap-8 bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
          <aside className="bg-gray-900/80 md:w-64 p-4">
            <SettingsList
              selectedSetting={selectedSetting}
              setSelectedSetting={setSelectedSetting}
            />
          </aside>
          <div className="flex-1 p-6">{renderSettingsContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
