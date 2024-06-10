import { useState } from "react";
import FundModal from "./components/FundModal";

const Funds = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="px-32">
            <h1 className="text-4xl font-semibold text-center capitalize my-6">Donate to Our <br /> Blood Donation Fund</h1>
            <p className="mt-3 text-center max-w-xl mx-auto">Your contribution can save lives. By donating to our Blood Donation Fund, you support essential blood drives, medical supplies, and outreach programs that ensure a steady supply of life-saving blood for those in need.</p>

            <div className="text-center mt-12">
                <button onClick={() => setIsOpen(true)} className="relative rounded-full px-5 py-2.5 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative">Give fund</span>
                </button>

                <FundModal isOpen={isOpen} closeModal={handleCloseModal} />
            </div>

            <div className="overflow-x-auto mt-6">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Fund donor</th>
                            <th>Donor email</th>
                            <th>Amount</th>
                            <th>Donation date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // requests.map((request, i) => <TableBody key={request?._id} i={i} request={request} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funds;