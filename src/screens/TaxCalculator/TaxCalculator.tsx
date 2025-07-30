import React, { useState } from 'react';
import { Calculator, FileText, DollarSign, Percent, Building, User } from 'lucide-react';
import Header from '../../lib/Compenents/Header';
import { SlideMenuByAnima } from '../DataAnalytics/sections/SlideMenuByAnima';
import { SettingsLougOutSlideMenu } from '../Dashboard/sections/SettingsLougOutSlideMenu';

interface TaxResult {
  taxAmount: number;
  afterTaxAmount: number;
  effectiveRate: number;
  breakdown?: { bracket: string; rate: number; amount: number }[];
}

const TaxCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('income');
  
  // Income Tax State
  const [income, setIncome] = useState<string>('');
  const [incomeResult, setIncomeResult] = useState<TaxResult | null>(null);
  
  // VAT State
  const [vatAmount, setVatAmount] = useState<string>('');
  const [vatRate, setVatRate] = useState<string>('15');
  const [vatType, setVatType] = useState<'inclusive' | 'exclusive'>('exclusive');
  const [vatResult, setVatResult] = useState<TaxResult | null>(null);
  
  // WHT State
  const [whtAmount, setWhtAmount] = useState<string>('');
  const [whtRate, setWhtRate] = useState<string>('5');
  const [whtType, setWhtType] = useState<string>('services');
  const [whtResult, setWhtResult] = useState<TaxResult | null>(null);
  
  // Turnover Tax State
  const [turnover, setTurnover] = useState<string>('');
  const [turnoverResult, setTurnoverResult] = useState<TaxResult | null>(null);

  // Income Tax Calculation (Progressive rates)
  const calculateIncomeTax = () => {
    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue <= 0) return;

    // Sample progressive tax brackets
    const brackets = [
      { min: 0, max: 50000, rate: 0 },
      { min: 50001, max: 100000, rate: 10 },
      { min: 100001, max: 200000, rate: 20 },
      { min: 200001, max: 500000, rate: 25 },
      { min: 500001, max: Infinity, rate: 30 }
    ];

    let totalTax = 0;
    const breakdown: { bracket: string; rate: number; amount: number }[] = [];

    for (const bracket of brackets) {
      if (incomeValue > bracket.min) {
        const taxableInThisBracket = Math.min(incomeValue, bracket.max) - bracket.min + 1;
        const taxForThisBracket = (taxableInThisBracket * bracket.rate) / 100;
        totalTax += taxForThisBracket;
        
        if (taxForThisBracket > 0) {
          breakdown.push({
            bracket: bracket.max === Infinity 
              ? `$${bracket.min.toLocaleString()}+` 
              : `$${bracket.min.toLocaleString()} - $${bracket.max.toLocaleString()}`,
            rate: bracket.rate,
            amount: taxForThisBracket
          });
        }
      }
    }

    setIncomeResult({
      taxAmount: totalTax,
      afterTaxAmount: incomeValue - totalTax,
      effectiveRate: (totalTax / incomeValue) * 100,
      breakdown
    });
  };

  // VAT Calculation
  const calculateVAT = () => {
    const amount = parseFloat(vatAmount);
    const rate = parseFloat(vatRate);
    if (isNaN(amount) || isNaN(rate) || amount <= 0 || rate < 0) return;

    let vatTax: number;
    let netAmount: number;

    if (vatType === 'inclusive') {
      // VAT is included in the amount
      vatTax = (amount * rate) / (100 + rate);
      netAmount = amount - vatTax;
    } else {
      // VAT is exclusive (added to the amount)
      vatTax = (amount * rate) / 100;
      netAmount = amount;
    }

    setVatResult({
      taxAmount: vatTax,
      afterTaxAmount: vatType === 'inclusive' ? netAmount : amount + vatTax,
      effectiveRate: rate
    });
  };

  // WHT Calculation
  const calculateWHT = () => {
    const amount = parseFloat(whtAmount);
    const rate = parseFloat(whtRate);
    if (isNaN(amount) || isNaN(rate) || amount <= 0 || rate < 0) return;

    const whtTax = (amount * rate) / 100;
    
    setWhtResult({
      taxAmount: whtTax,
      afterTaxAmount: amount - whtTax,
      effectiveRate: rate
    });
  };

  // Turnover Tax Calculation (usually 1% for small businesses)
  const calculateTurnoverTax = () => {
    const turnoverValue = parseFloat(turnover);
    if (isNaN(turnoverValue) || turnoverValue <= 0) return;

    const rate = 1; // 1% for small businesses
    const tax = (turnoverValue * rate) / 100;
    
    setTurnoverResult({
      taxAmount: tax,
      afterTaxAmount: turnoverValue - tax,
      effectiveRate: rate
    });
  };

  const tabs = [
    { id: 'income', label: 'Income Tax', icon: User },
    { id: 'vat', label: 'VAT', icon: Percent },
    { id: 'wht', label: 'Withholding Tax', icon: FileText },
    { id: 'turnover', label: 'Turnover Tax', icon: Building }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="bg-[#faf9ff] overflow-hidden w-full max-w-[1440px] relative">
        {/* Header */}

        <div className="pr-9">
          <Header />
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Calculate your Income Tax, VAT, Withholding Tax, and Turnover Tax with our comprehensive calculator
          </p>
        </div>

                        {/* Sidebar */}
        <div className="w-[250px] h-full fixed top-0  bg-[#5a57ff] rounded-[0px_30px_30px_0px] z-10 overflow-auto scrollbar-hide">
                          
          <div className="pt-10 pl-[53px] [font-family:'Poppins',Helvetica] font-bold text-white text-xl">
              LIKUTA Track
          </div>
                            
          <div className="pt-[30px] pr-5">
              <SlideMenuByAnima />
          </div>
                
          <div className="pt-[30px]">
              <SettingsLougOutSlideMenu />
          </div>
                          
        </div>

        <main className="ml-[280px] p-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 mx-2 mb-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg transform -translate-y-0.5'
                    : 'text-gray-600 bg-white hover:shadow-md hover:transform hover:-translate-y-0.5'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#5A57FF' : 'white'
                }}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Calculator Content */}
        <div className="max-w-4xl mx-auto">
          {/* Income Tax Calculator */}
          {activeTab === 'income' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3" style={{ color: '#5A57FF' }} />
                Income Tax Calculator
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Enter your annual income"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5A57FF] focus:outline-none transition-all"
                  />
                  <button
                    onClick={calculateIncomeTax}
                    className="w-full mt-4 py-3 px-6 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                    style={{ backgroundColor: '#5A57FF' }}
                  >
                    Calculate Income Tax
                  </button>
                </div>
                
                {incomeResult && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gross Income:</span>
                        <span className="font-medium">{formatCurrency(parseFloat(income))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax Amount:</span>
                        <span className="font-medium text-red-600">{formatCurrency(incomeResult.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">After-Tax Income:</span>
                        <span className="font-medium text-green-600">{formatCurrency(incomeResult.afterTaxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Effective Rate:</span>
                        <span className="font-medium">{incomeResult.effectiveRate.toFixed(2)}%</span>
                      </div>
                    </div>
                    
                    {incomeResult.breakdown && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-800 mb-3">Tax Breakdown</h4>
                        {incomeResult.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">{item.bracket} ({item.rate}%):</span>
                            <span>{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VAT Calculator */}
          {activeTab === 'vat' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Percent className="w-6 h-6 mr-3" style={{ color: '#5A57FF' }} />
                VAT Calculator
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={vatAmount}
                      onChange={(e) => setVatAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      VAT Rate (%)
                    </label>
                    <input
                      type="number"
                      value={vatRate}
                      onChange={(e) => setVatRate(e.target.value)}
                      placeholder="Enter VAT rate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      VAT Type
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="exclusive"
                          checked={vatType === 'exclusive'}
                          onChange={(e) => setVatType(e.target.value as 'exclusive')}
                          className="mr-2"
                        />
                        VAT Exclusive
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="inclusive"
                          checked={vatType === 'inclusive'}
                          onChange={(e) => setVatType(e.target.value as 'inclusive')}
                          className="mr-2"
                        />
                        VAT Inclusive
                      </label>
                    </div>
                  </div>
                  
                  <button
                    onClick={calculateVAT}
                    className="w-full py-3 px-6 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                    style={{ backgroundColor: '#5A57FF' }}
                  >
                    Calculate VAT
                  </button>
                </div>
                
                {vatResult && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {vatType === 'inclusive' ? 'Gross Amount:' : 'Net Amount:'}
                        </span>
                        <span className="font-medium">{formatCurrency(parseFloat(vatAmount))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT Amount:</span>
                        <span className="font-medium text-red-600">{formatCurrency(vatResult.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {vatType === 'inclusive' ? 'Net Amount:' : 'Total Amount:'}
                        </span>
                        <span className="font-medium text-green-600">{formatCurrency(vatResult.afterTaxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT Rate:</span>
                        <span className="font-medium">{vatResult.effectiveRate}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WHT Calculator */}
          {activeTab === 'wht' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3" style={{ color: '#5A57FF' }} />
                Withholding Tax Calculator
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Amount
                    </label>
                    <input
                      type="number"
                      value={whtAmount}
                      onChange={(e) => setWhtAmount(e.target.value)}
                      placeholder="Enter payment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Type
                    </label>
                    <select
                      value={whtType}
                      onChange={(e) => {
                        setWhtType(e.target.value);
                        // Set default rates based on type
                        const rates: { [key: string]: string } = {
                          'services': '5',
                          'interest': '15',
                          'dividends': '10',
                          'royalties': '20',
                          'rent': '10'
                        };
                        setWhtRate(rates[e.target.value] || '5');
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    >
                      <option value="services">Services (5%)</option>
                      <option value="interest">Interest (15%)</option>
                      <option value="dividends">Dividends (10%)</option>
                      <option value="royalties">Royalties (20%)</option>
                      <option value="rent">Rent (10%)</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WHT Rate (%)
                    </label>
                    <input
                      type="number"
                      value={whtRate}
                      onChange={(e) => setWhtRate(e.target.value)}
                      placeholder="Enter WHT rate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <button
                    onClick={calculateWHT}
                    className="w-full py-3 px-6 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                    style={{ backgroundColor: '#5A57FF' }}
                  >
                    Calculate WHT
                  </button>
                </div>
                
                {whtResult && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gross Payment:</span>
                        <span className="font-medium">{formatCurrency(parseFloat(whtAmount))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">WHT Amount:</span>
                        <span className="font-medium text-red-600">{formatCurrency(whtResult.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Payment:</span>
                        <span className="font-medium text-green-600">{formatCurrency(whtResult.afterTaxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">WHT Rate:</span>
                        <span className="font-medium">{whtResult.effectiveRate}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Turnover Tax Calculator */}
          {activeTab === 'turnover' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3" style={{ color: '#5A57FF' }} />
                Turnover Tax Calculator
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Turnover
                    </label>
                    <input
                      type="number"
                      value={turnover}
                      onChange={(e) => setTurnover(e.target.value)}
                      placeholder="Enter annual turnover"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Turnover tax is typically 1% of gross turnover for small businesses. 
                      This is a simplified tax system for small enterprises.
                    </p>
                  </div>
                  
                  <button
                    onClick={calculateTurnoverTax}
                    className="w-full py-3 px-6 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                    style={{ backgroundColor: '#5A57FF' }}
                  >
                    Calculate Turnover Tax
                  </button>
                </div>
                
                {turnoverResult && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Turnover:</span>
                        <span className="font-medium">{formatCurrency(parseFloat(turnover))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Turnover Tax:</span>
                        <span className="font-medium text-red-600">{formatCurrency(turnoverResult.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">After-Tax Turnover:</span>
                        <span className="font-medium text-green-600">{formatCurrency(turnoverResult.afterTaxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax Rate:</span>
                        <span className="font-medium">{turnoverResult.effectiveRate}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        </main>
      </div>
    </div>
  );
};

export default TaxCalculator;