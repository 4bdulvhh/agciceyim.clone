import React, { useState } from "react";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("tedbirler");

  const tedbirlerImages = Array.from(
    { length: 42 },
    (_, i) => `https://agciceyim.az/data/gallery/${i + 1}.jpg`
  );

  const dekorImages = Array.from(
    { length: 40 },
    (_, i) => `https://agciceyim.az/data/gallery/d${i + 1}.jpg`
  );

  const galleryImages =
    activeTab === "tedbirler" ? tedbirlerImages : dekorImages;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-pacifico inline-block">Xidmətlər</h1>
        <div className="h-1 bg-[#0CE6DF] w-24 mx-auto mt-2"></div>
      </div>

      <p className="text-center text-gray-600 mb-12">
        Xoşbəxt anların ömür boyu xatırlanması üçün tərtib və dizayn işlərini
        peşəkarlara həvalə edin.
      </p>

      <h2 className="text-2xl font-pacifico border-l-4 border-[#0CE6DF] pl-4 mb-8 text-left">
        Təklif Olunan Xidmətlər
      </h2>

      <p className="mb-6">
        Hər bir şənlik yaxud tədbir özünəməxsus atmosferi və məkanın eksklüziv
        dekorasiyası sayəsində xüsusi ola bilər.
      </p>

      <p className="mb-6">
        "Ağ Çiçəyim"-in geniş çeşidli məhsulları, bəzək əşyaları, aksessuarları,
        hədiyyələri, eləcə də orijinal dizayn təklifləri, sizin və
        sevdiklərinizin önəmli anlarını heyrətamiz, unudulmaz bir şənliyə
        çevirəcək.
      </p>

      <p className="mb-12">
        Biz fərqli materiallardan hazırlanmış hər növ müasir dekorlar təqdim
        etməyə hazırıq. İşimizdə tekstil, təbii və süni çiçəklərdən,
        aksessuarlardan, çap materiallarından, işıqlı dekorlardan və s
        materiallardan istifadə olunur.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="font-semibold mb-4">
            Təşkil etdiyimiz əsas tədbir növləri:
          </h3>
          <ul className="space-y-2">
            <li>• Toy salonunun bəzədilməsi</li>
            <li>• Yubileyler, ad günləri</li>
            <li>• Uşaq tədbirləri</li>
            <li>• Korporativ</li>
            <li>• Yeni il və digər bayramlar</li>
            <li>• Rəsmi tədbilər</li>
            <li>• Sərgilər, mağaza açılışları və s.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Əsas dekorasiya növləri:</h3>
          <ul className="space-y-2">
            <li>• Yeni il ağacları və bəzəkləri</li>
            <li>• Şarlar ilə dizayn</li>
            <li>• Arka</li>
            <li>• Fotozona</li>
            <li>
              • Ad günü bəzəkləri, şənliklərinizi daha xüsusi etmək üçün və s.
              digər dekorlar.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-center space-x-8 mb-8">
          <button
            className={`pb-2 px-4 ${
              activeTab === "tedbirler"
                ? "border-b-4 font-futura border-[#0CE6DF] text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("tedbirler")}
          >
            Tədbirlər
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "dekor"
                ? "border-b-4 font-futura border-[#0CE6DF] text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("dekor")}
          >
            Dekor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((imageUrl, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
