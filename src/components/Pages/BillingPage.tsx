import React, { useState } from 'react';
import { CreditCard, ChevronLeft, ChevronRight, X, Printer, Download, DollarSign, Calendar, Receipt, Building, FileText, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}

interface Invoice {
  srNo: number;
  invoiceNumber: string;
  description: string;
  amount: number;
  date: string;
}

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
}

interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface BillingPageProps {
  isDarkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
            isDarkMode 
              ? 'bg-gray-900/95 border border-gray-700/50' 
              : 'bg-white/95 border border-gray-200/50'
          } backdrop-blur-xl`}
        >
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-100'
          } px-8 py-6 backdrop-blur-sm`}>
            <div className="flex justify-between items-center">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h2>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>
          <div className="p-8">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InvoiceModal: React.FC<{ isOpen: boolean; onClose: () => void; invoice: Invoice; isDarkMode: boolean }> = ({ 
  isOpen, 
  onClose, 
  invoice, 
  isDarkMode 
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download functionality would be implemented here');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details" isDarkMode={isDarkMode}>
      <div className={`p-8 rounded-2xl ${
        isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
      } backdrop-blur-sm`}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-4xl font-bold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              INVOICE
            </h1>
            <p className={`text-lg mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              InfoJoy Platform
            </p>
          </div>
          <div className="text-right">
            <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Invoice #: {invoice.invoiceNumber}
            </p>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Date: {invoice.date}
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Invoice To:
          </h2>
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-white/70'
          }`}>
            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Jimmy Turner
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              123 Main Street
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              New York, NY 10001
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full">
            <thead>
              <tr className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'} rounded-lg`}>
                <th className="p-4 text-left font-semibold">SL.</th>
                <th className="p-4 text-left font-semibold">Product Description</th>
                <th className="p-4 text-right font-semibold">Price</th>
                <th className="p-4 text-right font-semibold">Qty.</th>
                <th className="p-4 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="p-4">1</td>
                <td className="p-4">{invoice.description}</td>
                <td className="p-4 text-right">${invoice.amount.toFixed(2)}</td>
                <td className="p-4 text-right">1</td>
                <td className="p-4 text-right font-semibold">${invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-end mb-8">
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-white/70'
          }`}>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Payment Info:
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Account #: 1234 5678 9100
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A/C Name: InfoJoy Platform
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Bank Details: Business Bank
            </p>
          </div>
          <div className="text-right">
            <div className={`p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white/70'
            }`}>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Sub Total: ${invoice.amount.toFixed(2)}
              </p>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Tax: $0.00
              </p>
              <p className={`font-bold text-xl mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                TOTAL: ${invoice.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-6 border-t border-gray-300 dark:border-gray-600">
          <div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              For Any Query:
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Email: support@infojoy.com
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Call: +1 (555) 123-4567
            </p>
          </div>
          <div className="text-right">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Authorized Signature
            </p>
            <div className="mt-4 pt-2 border-t border-gray-300 dark:border-gray-600">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Digital Signature
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrint}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg font-medium"
        >
          <Printer className="mr-2" size={20} />
          Print
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg font-medium"
        >
          <Download className="mr-2" size={20} />
          Download
        </motion.button>
      </div>
    </Modal>
  );
};

const BillingPage: React.FC<BillingPageProps> = ({ isDarkMode }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [cardDetails, setCardDetails] = useState<CardDetails>({ number: '', expiry: '', cvv: '' });
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({ 
    street: '123 Main Street', 
    city: 'Brooklyn', 
    state: 'NY', 
    zip: '11122' 
  });
  
  const itemsPerPage = 5;
  const totalPages = 3;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCardUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCardModalOpen(false);
  };

  const handleAddressUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddressModalOpen(false);
  };

  const openInvoiceModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };

  const invoices: Invoice[] = [
    { srNo: 1, invoiceNumber: 'INV-001', description: 'Pro Plan Subscription', amount: 32.34, date: '10/09/23' },
    { srNo: 2, invoiceNumber: 'INV-002', description: 'Pro Plan Subscription', amount: 32.34, date: '11/09/23' },
    { srNo: 3, invoiceNumber: 'INV-003', description: 'Pro Plan Subscription', amount: 32.34, date: '12/09/23' },
    { srNo: 4, invoiceNumber: 'INV-004', description: 'Pro Plan Subscription', amount: 32.34, date: '13/09/23' },
    { srNo: 5, invoiceNumber: 'INV-005', description: 'Pro Plan Subscription', amount: 32.34, date: '14/09/23' },
  ];

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Billing & Subscriptions
          </h1>
          <p className={`text-lg mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your billing information and view transaction history
          </p>
        </motion.div>
        
        {/* Account Type section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-8 p-8 rounded-2xl shadow-xl ${
            isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white border border-gray-200/50'
          } backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            } shadow-md`}>
              <DollarSign size={24} className="text-blue-500" />
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Current Subscription
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-blue-50/50 border border-blue-200/30'
            }`}>
              <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                YOUR SUBSCRIPTION
              </h3>
              <p className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                1x Growth Account
              </p>
              <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                $32 per profile/month
              </p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-green-50/50 border border-green-200/30'
            }`}>
              <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                YOUR NEXT BILL
              </h3>
              <p className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                $32.00
              </p>
              <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                on April 3rd, 2023
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Upgrade Account
          </motion.button>
        </motion.div>
        
        {/* Payment Methods section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-8 p-8 rounded-2xl shadow-xl ${
            isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white border border-gray-200/50'
          } backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
            } shadow-md`}>
              <CreditCard size={24} className="text-purple-500" />
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Payment Methods
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
            }`}>
              <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                PAYMENT DETAILS
              </h3>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'
                } mr-3`}>
                  <CreditCard size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </div>
                <span className={`text-lg font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  •••• •••• •••• 1234
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                onClick={() => setIsCardModalOpen(true)}
              >
                <Edit size={16} className="mr-2" />
                Update Card
              </motion.button>
            </div>
            
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
            }`}>
              <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                BILLING ADDRESS
              </h3>
              <div className="flex items-start mb-4">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'
                } mr-3 mt-1`}>
                  <Building size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </div>
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {billingAddress.street}
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                onClick={() => setIsAddressModalOpen(true)}
              >
                <Edit size={16} className="mr-2" />
                Update Address
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Billing History section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-8 rounded-2xl shadow-xl ${
            isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white border border-gray-200/50'
          } backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
            } shadow-md`}>
              <Receipt size={24} className="text-green-500" />
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Billing History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left pb-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sr. No.
                  </th>
                  <th className={`text-left pb-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Invoice Number
                  </th>
                  <th className={`text-left pb-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </th>
                  <th className={`text-left pb-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Amount
                  </th>
                  <th className={`text-left pb-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date
                  </th>
                  <th className={`text-left pb-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((invoice) => (
                  <motion.tr 
                    key={invoice.srNo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: invoice.srNo * 0.1 }}
                    className={`border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200`}
                  >
                    <td className="py-4">
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {invoice.srNo}
                      </span>
                    </td>
                    <td className="py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                        onClick={() => openInvoiceModal(invoice)}
                      >
                        {invoice.invoiceNumber}
                      </motion.button>
                    </td>
                    <td className="py-4">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {invoice.description}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${invoice.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {invoice.date}
                      </span>
                    </td>
                    <td className="py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-all duration-200`}
                      >
                        <FileText size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-3 rounded-xl transition-all duration-200 ${
                currentPage === 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : isDarkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <span className={`px-4 py-2 rounded-xl font-medium ${
              isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              Page {currentPage} of {totalPages}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-xl transition-all duration-200 ${
                currentPage === totalPages 
                  ? 'opacity-50 cursor-not-allowed' 
                  : isDarkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Credit Card Update Modal */}
        <Modal 
          isOpen={isCardModalOpen} 
          onClose={() => setIsCardModalOpen(false)} 
          title="Update Credit Card"
          isDarkMode={isDarkMode}
        >
          <form onSubmit={handleCardUpdate} className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Card Number
              </label>
              <input
                type="text"
                className={`w-full p-4 border rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-600/50 text-white focus:border-blue-500' 
                    : 'bg-gray-50/50 border-gray-200/50 text-gray-900 focus:border-blue-500'
                }`}
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  className={`w-full p-4 border rounded-xl transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-600/50 text-white focus:border-blue-500' 
                      : 'bg-gray-50/50 border-gray-200/50 text-gray-900 focus:border-blue-500'
                  }`}
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  CVV
                </label>
                <input
                  type="text"
                  className={`w-full p-4 border rounded-xl transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-600/50 text-white focus:border-blue-500' 
                      : 'bg-gray-50/50 border-gray-200/50 text-gray-900 focus:border-blue-500'
                  }`}
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg"
            >
              Update Card
            </motion.button>
          </form>
        </Modal>

        {/* Billing Address Update Modal */}
        <Modal 
          isOpen={isAddressModalOpen} 
          onClose={() => setIsAddressModalOpen(false)} 
          title="Update Billing Address"
          isDarkMode={isDarkMode}
        >
          <form onSubmit={handleAddressUpdate} className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Street Address
              </label>
              <input
                type="text"
                className={`w-full p-4 border rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-600/50 text-white focus:border-blue-500' 
                    : 'bg-gray-50/50 border-gray-200/50 text-gray-900 focus:border-blue-500'
                }`}
                value={billingAddress.street}
                onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                City
              </label>
              <input
                type="text"
                className={`w-full p-4 border rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-600/50 text-white focus:border-blue-500' 
                    : 'bg-gray-50/50 border-gray-200/50 text-gray-900 focus:border-blue-500'
                }`}
                value={billingAddress.city}
                onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  State
                </label>
                <input
                  type="text"
                  className={`w-full p-4 border rounded-xl transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-600/50 text-white focus:border-blue-500' 
                      : 'bg-gray-50/50 border-gray-200/50 text-gray-900 focus:border-blue-500'
                  }`}
                  value={billingAddress.state}
                  onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  ZIP Code
                </label>
                <input
                  type="text"
                  className={`w-full p-4 border rounded-xl transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-600/50 text-white focus:border-blue-500' 
                      : 'bg-gray-50/50 border-gray-200/50 text-gray-900 focus:border-blue-500'
                  }`}
                  value={billingAddress.zip}
                  onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                  required
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg"
            >
              Update Address
            </motion.button>
          </form>
        </Modal>

        {/* Invoice Modal */}
        {selectedInvoice && (
          <InvoiceModal
            isOpen={isInvoiceModalOpen}
            onClose={() => setIsInvoiceModalOpen(false)}
            invoice={selectedInvoice}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
};

export default BillingPage;