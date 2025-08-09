// app/wallet/page.tsx
"use client";
import React, { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function WalletPage() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] px-4 py-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">Currency Exchange</h1>
        </div>
      </div>
      
      <div className="px-4 py-6 flex flex-col items-center flex-1">

      {/* Exchange Card */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-8">
        {/* From */}
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">From</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <select className="bg-transparent focus:outline-none text-[#fe585f] font-bold">
              <option>UNC</option>
              <option>USDC</option>
              <option>ANT</option>
            </select>
            <input
              type="number"
              placeholder="0.0"
              className="ml-auto w-24 text-right focus:outline-none"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Balance: 1,250.45 UNC</p>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center my-3">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
            ⇅
          </button>
        </div>

        {/* To */}
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">To</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <select className="bg-transparent focus:outline-none text-[#fe585f] font-bold">
              <option>USDC</option>
              <option>UNC</option>
              <option>ANT</option>
            </select>
            <input
              type="number"
              placeholder="0.0"
              className="ml-auto w-24 text-right focus:outline-none"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Balance: 13,300.72 USDC</p>
        </div>

        {/* Button */}
        <button className="w-full bg-[#fe585f] text-white py-3 rounded-lg font-bold hover:opacity-90">
          Enter Amount
        </button>
      </div>

      {/* Token Prices */}
      <div className="w-full max-w-lg grid grid-cols-3 gap-3 mb-8">
        <div className="p-4 border border-gray-200 rounded-xl text-center">
          <p className="font-bold text-[#fe585f]">UNC</p>
          <p className="text-lg font-bold">$8.92</p>
          <p className="text-green-500 flex items-center justify-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" /> 12.5%
          </p>
        </div>
        <div className="p-4 border border-gray-200 rounded-xl text-center">
          <p className="font-bold text-[#fe585f]">ANT</p>
          <p className="text-lg font-bold">$4.67</p>
          <p className="text-red-500 flex items-center justify-center text-sm">
            <TrendingDown className="w-4 h-4 mr-1" /> 3.2%
          </p>
        </div>
        <div className="p-4 border border-gray-200 rounded-xl text-center">
          <p className="font-bold text-[#fe585f]">USDC</p>
          <p className="text-lg font-bold">$1</p>
          <p className="text-green-500 flex items-center justify-center text-sm">
            <TrendingUp className="w-4 h-4 mr-1" /> 0.01%
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4 text-[#fe585f]">Recent Exchanges</h2>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span>250 UNC → 478.5 ANT</span>
            <span className="text-gray-400">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span>1000 USDC → 112.1 UNC</span>
            <span className="text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
