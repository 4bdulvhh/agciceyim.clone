import { useState } from "react";
import { IoClose } from "react-icons/io5";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Daxil ol</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0CE6DF]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Şifrə</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0CE6DF]"
            />
          </div>

          <div className="text-sm">
            <a href="#" className="text-[#0CE6DF] hover:underline">
              Şifrənin bərpası
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0CE6DF] text-white rounded hover:bg-[#0daba5] transition-colors"
            >
              Daxil ol
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
            >
              Qeydiyyat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
