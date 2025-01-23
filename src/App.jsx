import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Content from './components/Content';
import Slider from './components/Slider';
import TrendMehsullar from './components/TrendMehsullar';
import VipMehsullar from './components/VipMehsullar';
import Services from './components/Services';
import Product from './components/Product';
import Xidmetler from './components/Xidmetler';
import Catdirilma from './components/Catdirilma';
import Filiallar from './components/Fliallar';
import { CartProvider } from './components/Navbar';
import Statuslar from './components/Statuslar';
import FooterElaqe from './components/FooterElaqe';
import ScrollToTop from './ScroolToTop';

const App = () => {
  return (
    <CartProvider>
        <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Slider />
              <TrendMehsullar/>
              <VipMehsullar/>
              <Services/>
              <FooterElaqe/>
            </>
          } />
          <Route path="category/:mainCategory/:subCategory" element={<Content />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="xidmetler" element={<Xidmetler/>} />
          <Route path="sertler-ve-qaydalar" element={<Catdirilma/>} />
          <Route path="filiallar" element={<Filiallar/>} />
          <Route path="statuslar" element={<Statuslar/>} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default App;