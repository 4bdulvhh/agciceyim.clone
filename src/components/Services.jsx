import React from "react";
import { Sparkles, ThumbsUp, Moon } from "lucide-react";

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-pacifico mb-4 text-black">Xidmətlər</h1>
        <div className="w-12 h-1 bg-[#00FFE5] mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Xoşbəxt anların ömür boyu xatırlanması üçün tərtib və dizayn işlərini
          peşəkarlara həvalə edin.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
          <div className="p-6 absolute top-0 left-0 z-10">
            <h3 className="text-3xl font-bold text-[#00FFE5] mb-2">
              TƏDBİRLƏR
            </h3>
            <p className="text-gray-700 mb-3">Korporativ, Toy, Yeni il və s.</p>
            <a
              href="#"
              className="text-black font-medium hover:underline hover:text-[#00FFE5]"
            >
              Ətraflı
            </a>
          </div>
          <img
            src="https://agciceyim.az/template/design/assets/images/banner244.jpg"
            alt="Tədbirlər"
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
          <div className="p-6 absolute top-0 left-0 z-10">
            <h3 className="text-3xl font-bold text-[#00FFE5] mb-2">DEKOR</h3>
            <p className="text-gray-700 mb-3">Arka, Fotozona, Bəzəklər və s.</p>
            <a
              href="#"
              className="text-black font-medium hover:underline hover:text-[#00FFE5]"
            >
              Ətraflı
            </a>
          </div>
          <img
            src="https://agciceyim.az/template/design/assets/images/banner252.jpg"
            alt="Dekor"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-300 hover:border-2 hover:border-[#00FFE5]">
          <div className="mb-4">
            <Sparkles className="mx-auto text-[#00FFE5] w-8 h-8" />
          </div>
          <h4 className="text-gray-800 font-medium mb-2">Stil</h4>
          <p className="text-gray-600">Bənzərsiz və xüsusi dizayn</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-300 hover:border-2 hover:border-[#00FFE5]">
          <div className="mb-4">
            <ThumbsUp className="mx-auto text-[#00FFE5] w-8 h-8" />
          </div>
          <h4 className="text-gray-800 font-medium mb-2">Keyfiyyət</h4>
          <p className="text-gray-600">Ən təravətli çiçəklər</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-300 hover:border-2 hover:border-[#00FFE5]">
          <div className="mb-4">
            <Moon className="mx-auto text-[#00FFE5] w-8 h-8" />
          </div>
          <h4 className="text-gray-800 font-medium mb-2">24/7</h4>
          <p className="text-gray-600">Fasiləsiz xidmət</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
