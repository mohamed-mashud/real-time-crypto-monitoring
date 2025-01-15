import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/config";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export default function Main() {
    const [coinsData, setCoinsData] = useState("");

    const getCoins = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/crypto/coinsPrice`);
            const data = response.data;
            setCoinsData(JSON.stringify(data));
        } catch (error) {
            console.error("Error fetching coins data:", error);
        }
    };

    useEffect(() => {
        getCoins();
    }, []);

    const renderCoinsData = () => {
        if (!coinsData) return null;

        const coins = JSON.parse(coinsData);
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin Names</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (in INR)</th>
                        <th className="flex flex-row justify-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Set Alert</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Object.keys(coins).map((coin, index) => (
                        <tr key={index} className="space-x-4">
                            <td className="px-6 py-4 whitespace-nowrap">{coin}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{coins[coin].inr}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <InputBox placeholder="enter val" lable = "/" />
                                <Button label= "Set Alert" onClick={() => alert(`Alert set for ${coin}`)} className="text-indigo-600 hover:text-indigo-900" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <h1 className="flex flex-row justify-center text-3xl font-bold text-gray-900">Crypto Coins Prices  
                </h1>
            {renderCoinsData()}
        </div>
    );
}