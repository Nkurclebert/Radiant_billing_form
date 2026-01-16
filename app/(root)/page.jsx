'use client'; // if using App Router
import { useState } from 'react';

export default function BillingForm() {
  // const [policyIds, setPolicyIds] = useState('');
  // const [pdfReady, setPdfReady] = useState(false);

  // const handleSubmit = async () => {
  //   const idsArray = policyIds.split(/[\n,]+/).map(id => id.trim()).filter(Boolean);
  //   console.log(idsArray); // later: send to API
  //   setPdfReady(true);
  // };

  // const handleDownload = () => {
  //   alert("PDF download triggered!"); // placeholder
  // };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
      
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
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          <div className="sm:col-span-2">
            <label htmlFor="policy-numbers" className="block text-sm/6 font-semibold text-gray-900">
              Insert Policy Number(s):
            </label>
            <div className="mt-2.5">
              <textarea
                id="policy-numbers"
                name="policy-numbers"
                rows={4}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                defaultValue={''}
                placeholder="E.g., RD001MOTO0260001, RD001MOTO0260002"
              />
            </div>
          </div>
          
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit and Check
          </button>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-green-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Download bill (PDF)
          </button>
        </div>
      </form>
    </div>
  );
}
