import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Plus, FileText, LogOut, Wallet, AlertTriangle, Clock, CheckCircle, Edit, Eye } from 'lucide-react';

// Mock data for criminal records
const mockRecords = [
  {
    id: '1',
    name: 'John Doe',
    crime: 'Theft',
    date: '2024-01-15',
    status: 'active',
    severity: 'medium',
    location: 'Downtown District',
    description: 'Shoplifting incident at local store',
    officerId: 'P001'
  },
  {
    id: '2',
    name: 'Jane Smith',
    crime: 'Fraud',
    date: '2024-01-10',
    status: 'pending',
    severity: 'high',
    location: 'Business District',
    description: 'Identity theft and credit card fraud',
    officerId: 'D002'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    crime: 'Vandalism',
    date: '2024-01-08',
    status: 'resolved',
    severity: 'low',
    location: 'Residential Area',
    description: 'Graffiti on public property',
    officerId: 'P001'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    crime: 'Assault',
    date: '2024-01-12',
    status: 'active',
    severity: 'high',
    location: 'Park Avenue',
    description: 'Physical altercation resulting in injury',
    officerId: 'D002'
  }
];

// Authorized officers database
const authorizedOfficers = [
  { id: 'P001', name: 'Officer John Smith', badge: 'P001', department: 'Patrol', walletAddress: '0x742d35Cc6C4C85F3A5e4b4B6b6b3b1b2b1b2b1b2' },
  { id: 'D002', name: 'Detective Sarah Connor', badge: 'D002', department: 'Detective', walletAddress: '0x845d45Dd7D5D95F4B6e5c5C7c7c4c2c3c2c3c2c3' },
  { id: 'P003', name: 'Officer Mike Davis', badge: 'P003', department: 'Traffic', walletAddress: '0x123d45Ee8E8E95F5C7f6d6D8d8d5d3d4d3d4d3d4' }
];

// Wallet Authentication Component
function WalletAuth({ onAuthenticate }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      const officer = authorizedOfficers.find(
        o => o.walletAddress.toLowerCase() === walletAddress.toLowerCase()
      );
      if (!officer) {
        const demoOfficer = {
          id: 'DEMO',
          name: 'Officer Demo',
          badge: 'DEMO001',
          department: 'Demo Department',
          walletAddress
        };
        onAuthenticate(demoOfficer);
      } else {
        onAuthenticate(officer);
      }
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        className="backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-cyan-500/30 bg-black/40"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="p-4 bg-cyan-500/20 rounded-full border border-cyan-500/50">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Police Access Portal
          </motion.h1>

          <motion.p
            className="text-cyan-200 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Secure wallet authentication required for authorized personnel only
          </motion.p>
        </div>

        <motion.button
          onClick={connectWallet}
          disabled={isConnecting}
          className="
            w-full px-6 py-4
            bg-gradient-to-r from-cyan-600 to-cyan-500
            text-white rounded-xl shadow-lg font-semibold
            flex items-center justify-center space-x-3
            transition duration-300 ease-in-out
            hover:scale-105
            hover:from-cyan-400 hover:to-cyan-600
            hover:shadow-[0_0_20px_#22d3ee80]
            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Connect wallet"
        >
          <Wallet className="w-5 h-5" />
          <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
        </motion.button>

        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            role="alert"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-8 pt-6 border-t border-cyan-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="text-center space-y-2">
            <p className="text-xs text-cyan-300">
              Authorized Personnel Only
            </p>
            <p className="text-xs text-gray-400">
              Your wallet address must be registered in the system
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard({ officer, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [records, setRecords] = useState(mockRecords);

  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.crime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-900/30 border-red-500/50';
      case 'pending': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'resolved': return 'text-green-400 bg-green-900/30 border-green-500/50';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-500/50';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white">
      <div className="w-full px-4 py-6">

      {/* Header */}
      <motion.header
        className="bg-black/60 backdrop-blur-lg border-b border-cyan-500/30"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto w-full">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/50">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Police Dashboard</h1>
              <p className="text-sm text-cyan-300">
                {officer.name} • Badge: {officer.badge} • {officer.department}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p className="text-gray-400">Wallet Connected</p>
              <p className="text-cyan-300 font-mono text-xs">
                {officer.walletAddress?.slice(0, 6)}...{officer.walletAddress?.slice(-4)}
              </p>
            </div>
            <motion.button
              onClick={onLogout}
              className="
                px-4 py-2 bg-red-600/80 hover:bg-red-500
                text-white rounded-lg font-medium
                flex items-center space-x-2
                transition duration-200
                hover:shadow-lg
                border border-red-500/50
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content Wrapper with centering and max width */}
      <div className="p-6 max-w-screen-xl mx-auto w-full">

        {/* Dashboard Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { 
              label: 'Total Records', 
              value: records.length, 
              icon: FileText, 
              color: 'cyan',
              bgColor: 'bg-cyan-500/10',
              borderColor: 'border-cyan-500/30'
            },
            { 
              label: 'Active Cases', 
              value: records.filter(r => r.status === 'active').length, 
              icon: AlertTriangle, 
              color: 'red',
              bgColor: 'bg-red-500/10',
              borderColor: 'border-red-500/30'
            },
            { 
              label: 'Pending Review', 
              value: records.filter(r => r.status === 'pending').length, 
              icon: Clock, 
              color: 'yellow',
              bgColor: 'bg-yellow-500/10',
              borderColor: 'border-yellow-500/30'
            },
            { 
              label: 'Resolved', 
              value: records.filter(r => r.status === 'resolved').length, 
              icon: CheckCircle, 
              color: 'green',
              bgColor: 'bg-green-500/10',
              borderColor: 'border-green-500/30'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`backdrop-blur-sm ${stat.bgColor} border ${stat.borderColor} rounded-xl p-6`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Actions Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, crime, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-12 pr-4 py-3
                bg-black/40 border border-gray-600
                rounded-xl text-white placeholder-gray-400
                focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                backdrop-blur-sm transition duration-200
              "
              aria-label="Search records by name, crime, or location"
            />
          </div>
          
          <motion.button
            onClick={() => setShowAddRecord(true)}
            className="
              px-6 py-3
              bg-gradient-to-r from-cyan-600 to-cyan-500
              text-white rounded-xl font-semibold
              flex items-center space-x-2
              transition duration-300
              hover:from-cyan-500 hover:to-cyan-400
              hover:shadow-lg hover:shadow-cyan-500/25
              border border-cyan-500/50
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add new record"
          >
            <Plus className="w-5 h-5" />
            <span>Add Record</span>
          </motion.button>
        </motion.div>

        {/* Records Table */}
        <motion.div
          className="backdrop-blur-sm bg-black/40 border border-gray-600 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/60 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Crime</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Severity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    className="border-b border-gray-700/50 hover:bg-gray-800/30 transition duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{record.name}</div>
                      <div className="text-sm text-gray-400">{record.location}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{record.crime}</td>
                    <td className="px-6 py-4 text-gray-300">{record.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(record.status)}`}>
                        {record.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getSeverityColor(record.severity)}`}>
                        {record.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition duration-200"
                          title="View Details"
                          aria-label={`View details of ${record.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition duration-200"
                          title="Edit Record"
                          aria-label={`Edit record of ${record.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No records found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedRecord(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="record-details-title"
        >
          <motion.div
            className="
              bg-black/90 border border-cyan-500/30 rounded-xl
              p-8 max-w-2xl w-full backdrop-blur-lg
              max-h-[80vh] overflow-y-auto
            "
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white" id="record-details-title">Record Details</h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition duration-200"
                aria-label="Close details modal"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm font-medium">Name</label>
                    <p className="text-white font-semibold text-lg">{selectedRecord.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">Crime</label>
                    <p className="text-white font-semibold">{selectedRecord.crime}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">Date</label>
                    <p className="text-white font-semibold">{selectedRecord.date}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm font-medium">Location</label>
                    <p className="text-white font-semibold">{selectedRecord.location}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedRecord.status)}`}>
                      {selectedRecord.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium">Severity</label>
                    <span className={`font-bold text-lg ${getSeverityColor(selectedRecord.severity)}`}>
                      {selectedRecord.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm font-medium">Description</label>
                <p className="text-white bg-gray-800/50 p-4 rounded-lg mt-2">
                  {selectedRecord.description}
                </p>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm font-medium">Assigned Officer</label>
                <p className="text-cyan-300 font-medium">{selectedRecord.officerId}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Record Modal */}
      {showAddRecord && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAddRecord(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-record-title"
        >
          <motion.div
            className="
              bg-black/90 border border-cyan-500/30 rounded-xl
              p-8 max-w-md w-full backdrop-blur-lg
            "
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white" id="add-record-title">Add New Record</h2>
              <button
                onClick={() => setShowAddRecord(false)}
                className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition duration-200"
                aria-label="Close add new record modal"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="name-input">Name</label>
                <input
                  id="name-input"
                  type="text"
                  className="
                    w-full px-4 py-3
                    bg-gray-800/50 border border-gray-600
                    rounded-lg text-white placeholder-gray-400
                    focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                    transition duration-200
                  "
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="crime-input">Crime</label>
                <input
                  id="crime-input"
                  type="text"
                  className="
                    w-full px-4 py-3
                    bg-gray-800/50 border border-gray-600
                    rounded-lg text-white placeholder-gray-400
                    focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                    transition duration-200
                  "
                  placeholder="Enter crime type"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="status-select">Status</label>
                  <select id="status-select" className="
                    w-full px-4 py-3
                    bg-gray-800/50 border border-gray-600
                    rounded-lg text-white
                    focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                    transition duration-200
                  ">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="severity-select">Severity</label>
                  <select id="severity-select" className="
                    w-full px-4 py-3
                    bg-gray-800/50 border border-gray-600
                    rounded-lg text-white
                    focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                    transition duration-200
                  ">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="location-input">Location</label>
                <input
                  id="location-input"
                  type="text"
                  className="
                    w-full px-4 py-3
                    bg-gray-800/50 border border-gray-600
                    rounded-lg text-white placeholder-gray-400
                    focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                    transition duration-200
                  "
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="description-textarea">Description</label>
                <textarea
                  id="description-textarea"
                  rows="3"
                  className="
                    w-full px-4 py-3
                    bg-gray-800/50 border border-gray-600
                    rounded-lg text-white placeholder-gray-400
                    focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                    transition duration-200 resize-none
                  "
                  placeholder="Enter case description"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="submit"
                  className="
                    flex-1 px-6 py-3
                    bg-gradient-to-r from-cyan-600 to-cyan-500
                    text-white rounded-lg font-semibold
                    transition duration-300
                    hover:from-cyan-500 hover:to-cyan-400
                    hover:shadow-lg hover:shadow-cyan-500/25
                  "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Record
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => setShowAddRecord(false)}
                  className="
                    px-6 py-3
                    bg-gray-700 hover:bg-gray-600
                    text-white rounded-lg font-medium
                    transition duration-200
                  "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}

// Main PoliceDashboard Component
function PoliceDashboard() {
  const [authenticatedOfficer, setAuthenticatedOfficer] = useState(null);

  const handleAuthentication = (officer) => {
    setAuthenticatedOfficer(officer);
  };

  const handleLogout = () => {
    setAuthenticatedOfficer(null);
  };

  if (!authenticatedOfficer) {
    return <WalletAuth onAuthenticate={handleAuthentication} />;
  }

  return <Dashboard officer={authenticatedOfficer} onLogout={handleLogout} />;
}

export default PoliceDashboard;
