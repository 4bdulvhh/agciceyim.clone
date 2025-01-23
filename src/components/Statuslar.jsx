const Statuslar = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 relative min-h-screen">
      <div className="py-12 text-center">
        <h1 className="font-pacifico text-2xl text-center font-bold mb-6   inline-block">
          Status necə qazanılır?
          <div className="h-1 bg-[#0CE6DF] w-24 mx-auto mt-2"></div>
        </h1>
        <div className="font-futura text-gray-500 text-center text-sm italic mb-12">
          "Ağ Çiçəyim" onlayn mağazasında müştəri tərəfindən əldə etmək və
          sistemli müştərilərimizi effektli etmək üçün statuslarda yaratmışdır.
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-xl font-semibold mb-3 font-pacifico">
              Qeydiyyatdan Keçin{" "}
              <div className="h-1 bg-[#0CE6DF] w-24 mx-auto mt-2"></div>
            </h2>
            <p className="text-gray-600 font-futura">
              Ağ Çiçəyim onlayn mağazasından təklifi yaradır. Qeydiyyat sənin
              onlayn sifarişlərinizə düzgün formada doldurduqca Claude
              qazanılır.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 font-pacifico">
              Statuslara Yüksəlin{" "}
              <div className="h-1 bg-[#0CE6DF] w-24 mx-auto mt-2"></div>
            </h2>
            <div className="space-y-4  text-left ">
              <div>
                <h3 className="font-medium font-pacifico mb-2">
                  SILVER status
                </h3>
                <p className="text-gray-600 font-futura">
                  Qeydiyyatdan dərhal sonra SİLVER statusu ilə bütün onlayn
                  alış-verişlərinizlə 2% endirim əldə edəcəksiniz. Bu vəziyyət
                  digər səviyyə təmin edilənə qədər GOLD statusuna yüksələcək.
                </p>
              </div>

              <div>
                <h3 className="font-medium font-pacifico mb-2">GOLD status</h3>
                <p className="text-gray-600 font-futura">
                  GOLD statusu yüksəltmək üçün, əvvəlki onlayn sifarişlərinizin
                  məbləği hədəfi 300 AZN-dən çox olmalıdır. GOLD statusunda
                  onlayn bütün sifarişlər üzrə əlavə 5% endirim əldə edəcəkdir.
                </p>
              </div>

              <div>
                <h3 className="font-medium font-pacifico mb-2">
                  PLATINUM status
                </h3>
                <p className="text-gray-600 font-futura">
                  PLATINUM statusu yüksəltmək üçün, əvvəlki onlayn
                  sifarişlərinizin məbləği hədəfi 650 AZN-dən çox olmalıdır.
                  PLATINUM statusunda onlayn bütün sifarişlər üzrə əlavə 10%
                  endirim əldə edəcəksiniz.
                </p>
              </div>

              <div>
                <h3 className="font-medium font-pacifico mb-2">
                  DIAMOND status
                </h3>
                <p className="text-gray-600 font-futura">
                  DIAMOND statusu yüksəltmək üçün, əvvəlki onlayn
                  sifarişlərinizin məbləği hədəfi 1000 AZN-dən çox olmalıdır. Bu
                  statusda bütün onlayn sifarişlər üzrə əlavə 15% endirim əldə
                  edəcəksiniz.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 font-pacifico">
              Ad günü hədiyyəsi
            </h2>
            <p className="text-gray-600 italic font-futura">
              "Ağ Çiçəyim" sizin bütün səy göstərilərək sizə hədiyyələr və
              təkliflər hazırlayır. Bu səbəbdən şəxsi email üçün qeydiyyat
              zamanı doğum günü tarixini, düzgün qeyd etməyiniz vacibdir.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-sm font-futura">
              Əgər qeydiyyatdan keçib, profildə tam məlumatlarınızı
              doldurmamısınızsa, həmçinin şəxsi alış-veriş təcrübənizi artırmaq
              üçün təqdim edilən "statuslarımızdan" yararlanmaq istəyirsinizsə,
              əsas məlumatlarınızı düzgün formada doldurduqca yararlanmaq
              mümkündür. Lazım məlumatları doldurduqdan sonra "Status Points"
              əlavə ediləcəkdir.
            </p>

            <p className="text-gray-600 text-sm font-futura">
              Alış-veriş profildə məlumatlarınız şəxsi ad günü bayramı, həftəlik
              məhsulu, xüsusi günləri, profildə məlumatı həmişə bəlli olur. Bu
              məlumatlar, şəxsi vizit və məlumatlarınız düzgün və təhlükəsizdir.
            </p>

            <p className="text-gray-600 text-sm font-futura">
              Status əməliyyatları yalnız qeydiyyatdan keçmiş istifadəçilər üçün
              mövcuddur.
            </p>

            <p className="text-gray-600 text-sm font-futura">
              Status əməliyyatlarından yalnız onlayn ala biləcəyiniz zaman
              faydalana bilərsiniz. Çatdırılmış məhsullar bu əməliyyatlara daxil
              deyil.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-300" />
    </div>
  );
};

export default Statuslar;
