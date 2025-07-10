import React, { useState } from 'react';
import { CreditCard, ChevronLeft, ChevronRight, X, Printer, Download } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const InvoiceModal: React.FC<{ isOpen: boolean; onClose: () => void; invoice: Invoice }> = ({ isOpen, onClose, invoice }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement download functionality here
    // You could use a library like jsPDF or html2pdf
    alert('Download functionality would be implemented here');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">INVOICE</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">LOGO HERE</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Invoice #: {invoice.invoiceNumber}</p>
            <p>Date: {invoice.date}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="font-bold mb-2">Invoice To:</h2>
          <p>NAME SURNAME</p>
          <p>123 Lorem Ipsum Country</p>
          <p>Street Address Goes Here</p>
        </div>
        
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 text-left">SL.</th>
              <th className="p-2 text-left">Product Description</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Qty.</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item} className="border-b dark:border-gray-700">
                <td className="p-2">{item}</td>
                <td className="p-2">Lorem Ipsum</td>
                <td className="p-2 text-right">$25.00</td>
                <td className="p-2 text-right">1</td>
                <td className="p-2 text-right">$25.00</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex justify-between mb-8">
          <div>
            <h3 className="font-bold mb-2">Payment Info:</h3>
            <p>Account #: 1234 5678 9100</p>
            <p>A/C Name: Name Surname</p>
            <p>Bank Details: Your Bank Name Here</p>
          </div>
          <div className="text-right">
            <p>Sub Total: $200.00</p>
            <p>Shipping: $15.00</p>
            <p>Tax Rate: $1.00</p>
            <p className="font-bold text-xl mt-2">TOTAL: $216.00</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p>For Any Query:</p>
            <p>Email Us: email@example.com</p>
            <p>Call Us: 000 0000 0000</p>
          </div>
          <div className="text-right">
            <p>Authorised Signature</p>
            <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-2">Signature</div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Printer className="mr-2" size={20} />
          Print
        </button>
        <button onClick={handleDownload} className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <Download className="mr-2" size={20} />
          Download
        </button>
      </div>
    </Modal>
  );
};

const BillingPage: React.FC<BillingPageProps> = ({ isDarkMode }) => {
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

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
    // Handle card update logic here
    setIsCardModalOpen(false);
  };

  const handleAddressUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle address update logic here
    setIsAddressModalOpen(false);
  };

  const openInvoiceModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };

  const invoices: Invoice[] = [
    { srNo: 1, invoiceNumber: 'INV-001', description: 'This is text', amount: 32.34, date: '10/09/23' },
    { srNo: 2, invoiceNumber: 'INV-002', description: 'This is text', amount: 32.34, date: '11/09/23' },
    { srNo: 3, invoiceNumber: 'INV-003', description: 'This is text', amount: 32.34, date: '12/09/23' },
    { srNo: 4, invoiceNumber: 'INV-004', description: 'This is text', amount: 32.34, date: '13/09/23' },
    { srNo: 5, invoiceNumber: 'INV-005', description: 'This is text', amount: 32.34, date: '14/09/23' },
  ];

  return (
    <div className={`p-6 ${bgColor} ${textColor}`}>
      <h1 className="text-2xl font-bold mb-6">Billing</h1>
      
      {/* Account Type section */}
      <div className={`mb-8 p-6 border ${borderColor} rounded-lg bg-white dark:bg-gray-800`}>
        <h2 className="text-xl font-semibold mb-4">Account Type</h2>
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="mb-4 md:mb-0">
            <h3 className="font-medium">YOUR SUBSCRIPTION</h3>
            <p className="text-lg">1x Growth Account</p>
            <p className="text-sm text-gray-500">$32 per profile/month</p>
          </div>
          <div>
            <h3 className="font-medium">YOUR NEXT BILL</h3>
            <p className="text-lg">$32.00</p>
            <p className="text-sm text-gray-500">on April 3rd, 2023</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Upgrade Account
        </button>
      </div>
      
      {/* Payment Methods section */}
      <div className={`mb-8 p-6 border ${borderColor} rounded-lg bg-white dark:bg-gray-800`}>
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-4 md:mb-0">
            <h3 className="font-medium">PAYMENT DETAILS</h3>
            <div className="flex items-center mt-2">
              <CreditCard className="mr-2" />
              <span>•••• •••• •••• 1234</span>
            </div>
            <button className="mt-2 text-blue-600 hover:underline" onClick={() => setIsCardModalOpen(true)}>Update Card</button>
          </div>
          <div>
            <h3 className="font-medium">BILLING ADDRESS</h3>
            <p>{billingAddress.street}</p>
            <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</p>
            <button className="mt-2 text-blue-600 hover:underline" onClick={() => setIsAddressModalOpen(true)}>Update Address</button>
          </div>
        </div>
      </div>
      
      {/* Billing History section */}
      <div className={`p-6 border ${borderColor} rounded-lg bg-white dark:bg-gray-800`}>
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left pb-2">Sr. No.</th>
                <th className="text-left pb-2">Invoice Number</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-left pb-2">Amount</th>
                <th className="text-left pb-2">Date</th>
                <th className="text-left pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((invoice) => (
                <tr key={invoice.srNo} className="border-b dark:border-gray-700">
                  <td className="py-2">{invoice.srNo}</td>
                  <td className="py-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openInvoiceModal(invoice)}
                    >
                      {invoice.invoiceNumber}
                    </button>
                  </td>
                  <td className="py-2">{invoice.description}</td>
                  <td className="py-2">${invoice.amount.toFixed(2)}</td>
                  <td className="py-2">{invoice.date}</td>
                  <td className="py-2 text-right">•••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mr-2 p-1 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`ml-2 p-1 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Credit Card Update Modal */}
      <Modal isOpen={isCardModalOpen} onClose={() => setIsCardModalOpen(false)} title="Update Credit Card">
        <form onSubmit={handleCardUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              className="w-full p-2 border rounded"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
              required
            />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-sm font-medium mb-1" htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                className="w-full p-2 border rounded"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                required
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-sm font-medium mb-1" htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                className="w-full p-2 border rounded"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Update Card</button>
        </form>
      </Modal>

      {/* Billing Address Update Modal */}
      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} title="Update Billing Address">
        <form onSubmit={handleAddressUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="street">Street Address</label>
            <input
              type="text"
              id="street"
              className="w-full p-2 border rounded"
              value={billingAddress.street}
              onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="w-full p-2 border rounded"
              value={billingAddress.city}
              onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
              required
            />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                className="w-full p-2 border rounded"
                value={billingAddress.state}
                onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                required
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-sm font-medium mb-1" htmlFor="zip">ZIP Code</label>
              <input
                type="text"
                id="zip"
                className="w-full p-2 border rounded"
                value={billingAddress.zip}
                onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Update Address</button>
        </form>
      </Modal>
      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default BillingPage;
