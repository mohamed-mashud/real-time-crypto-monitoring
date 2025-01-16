import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/config";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export default function Main() {
  const [coinsData, setCoinsData] = useState("");
  const [alerts, setAlerts] = useState({});
  const [alertMessage, setAlertMessage] = useState(""); // For displaying alert messages
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Controls popup visibility

  const getCoins = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/crypto/coinsPrice`);
      setCoinsData(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching coins data:", error);
    }
  };

  const checkAlerts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/alert`);
      const data = response.data;
      if (data.message !== "No alerts") {
        setAlertMessage(data.message);
        setIsAlertVisible(true); // Show popup when an alert is received
      }
    } catch (error) {
      console.error("Error fetching alert messages:", error);
    }
  };

  const setPriceLimit = async (coinId, upperLimit, lowerLimit, lastUpdatedAt) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/crypto/setlimit`, {
        coinId,
        upperLimit,
        lowerLimit,
        last_updated_at: lastUpdatedAt,
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error setting price limit:", error);
      alert("Failed to set price limit. Please try again.");
    }
  };

  useEffect(() => {
    // Initial API calls
    getCoins();
    checkAlerts();

    // Set intervals for periodic API calls
    const coinsInterval = setInterval(getCoins, 10000);
    const alertsInterval = setInterval(checkAlerts, 10000);

    // Clean up intervals on component unmount
    return () => {
      clearInterval(coinsInterval);
      clearInterval(alertsInterval);
    };
  }, []);

  const handleInputChange = (coin, type, value) => {
    setAlerts((prev) => ({
      ...prev,
      [coin]: {
        ...prev[coin],
        [type]: value,
      },
    }));
  };

  const handleSetAlert = (coin, lastUpdatedAt) => {
    const { upperLimit, lowerLimit } = alerts[coin] || {};
    if (upperLimit && lowerLimit) {
      setPriceLimit(coin, upperLimit, lowerLimit, lastUpdatedAt);
    } else {
      alert(`Please enter both upper and lower limits for ${coin}.`);
    }
  };

  const renderCoinsData = () => {
    if (!coinsData) return null;

    const coins = JSON.parse(coinsData);
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin Names</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (in INR)</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Upper Limit</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lower Limit</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Set Alert</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.keys(coins).map((coin, index) => (
            <tr key={index} className="space-x-4">
              <td className="px-6 py-4 whitespace-nowrap">{coin}</td>
              <td className="px-6 py-4 whitespace-nowrap">{coins[coin].inr}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <InputBox
                  label="upper limit"
                  placeholder="set limit above price"
                  value={alerts[coin]?.upperLimit || ""}
                  onChange={(e) => handleInputChange(coin, "upperLimit", e.target.value)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <InputBox
                  label="lower limit"
                  placeholder="set limit below price"
                  value={alerts[coin]?.lowerLimit || ""}
                  onChange={(e) => handleInputChange(coin, "lowerLimit", e.target.value)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Button
                  label="Set Alert"
                  onClick={() => handleSetAlert(coin, coins[coin].last_updated_at)}
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 className="flex flex-row justify-center text-3xl font-bold text-gray-900">
        Crypto Coins Prices
      </h1>
      {isAlertVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Alert</h2>
            <p>{alertMessage}</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              onClick={() => setIsAlertVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {renderCoinsData()}
    </div>
  );
}
