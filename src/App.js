import PageTabel from "./component/tablesPage";
import NavigationBar from "./component/navigasiPage";
import Formulir from "./component/formPage";
import HeroComp from "./component/heroComp";
import GalleryComp from "./component/galleryComp";
import ServicesComp from "./component/servicesComp";
import FaqComp from "./component/faqComp";
import FooterComp from "./component/footerComp";

function App() {
  return (
    <div>
      <HeroComp />

      {/*content*/}

      <NavigationBar />
      <PageTabel />
      <Formulir />
      <GalleryComp />
      <ServicesComp />
      <FaqComp />

      <FooterComp />
    </div>
  );
}

export default App;
