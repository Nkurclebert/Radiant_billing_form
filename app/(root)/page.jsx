'use client'; // if using App Router
import { useState } from 'react';

export default function BillingForm() {
  
  const [policyText, setPolicyText] = useState('');
  const [bills, setBills] = useState([]);
  const [pdfReady, setPdfReady] = useState(false);
  const [checkStatus, setCheckStatus] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  




  // Function to extract policy IDs from the textarea input
  const extractPolicyIds = () => {
    return policyText
      .split(/[\n,]+/) // split by newlines or commas
      .map(id => id.trim())
      .filter(id => id.length > 0);
  }

  // Handle form submission to fetch bills
  const handleSubmit = async (e) => {
    e.preventDefault();

    const policyIds = extractPolicyIds();

    if(policyIds.length === 0){
      alert("Please enter at least one policy number.");
      return;
    }

    const res = await fetch('/api/generateBills', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({policyIds}),
    });

    const data = await res.json();



    setBills(data.bills);

        if (data.bills.length > 0) {
          setCheckStatus("available");
          setPdfReady(true);

          const policyIds = extractPolicyIds();
          const url = `/api/downloadPdf?ids=${policyIds.join(",")}&preview=true`;

          setPreviewUrl(url);
        } else {
          setCheckStatus("not-available");
          setPdfReady(false);
          setPreviewUrl(null);
        }
    

  };


  // Handle PDF download
  const handleDownload = async () => {
    const policyIds = extractPolicyIds();

    const res = await fetch(
      `/api/downloadPdf?ids=${policyIds.join(',')}`
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'billing.pdf';
    a.click();
  };


  return (
    <div className="isolate bg-gray-50 px-6 py-16 sm:py-24 lg:px-8 relative">
      
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
        />
      </div>
          
      <div className="flex justify-center">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">EBM Billing Form</h2>
          <p className="mt-2 text-lg/8 text-gray-600">Provide policy-number(s) to download the bill(s) .</p>
        </div>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          <div className="sm:col-span-2">
            <label htmlFor="policy-numbers" 
              className="flex items-center gap-3 text-sm font-semibold text-gray-900">
              Insert Policy Number(s):

              {checkStatus === "available" && (
                <span className="text-green-600 text-sm font-medium">
                   Policy number(s) available
                </span>
              )}
            
              {checkStatus === "not-available" && (
                <span className="text-red-600 text-sm font-medium">
                   Policy number(s) not available
                </span>
              )}
            </label>
            <div className="mt-2.5">
              <textarea
                id="policy-numbers"
                name="policy-numbers"
                rows={4}
                value={policyText}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-400"
                placeholder="E.g., RD001MOTO0260001, RD001MOTO0260002"
                onChange={(e) => {
                  setPolicyText(e.target.value);
                  setCheckStatus(null); 
                  setPdfReady(false)
                }}
              />
            </div>
          </div>
          
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            
          >
            Submit and Check
          </button>
        </div>

        <div className="mt-10">
          <button
            type="button"
            className="block w-full rounded-md bg-green-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-400 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500
            
            disabled:bg-gray-400
            disabled:hover:bg-gray-400
            disabled:cursor-not-allowed
            disabled:opacity-60
            "
            onClick={handleDownload}
            disabled={!pdfReady}
          >
            {pdfReady ? "Download bill (PDF)" : "Generate bill first"}

          </button>
        </div>
        
        {previewUrl && (
          <div className="mt-10 bg-white rounded-lg p-4 shadow border border-gray-200">
            <div className='flex items-center justify-between mb-3'>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Bill Preview (PDF)
              </h3>

              <button
                onClick={() => setPreviewUrl(null)}
                className="text-gray-500 hover:text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>
                  
            <div className="h-120 border rounded overflow-hidden">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          </div>
        )}
          

      </form>
    </div>
  );
}
