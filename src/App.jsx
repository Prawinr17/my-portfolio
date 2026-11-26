import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import QuoteDivider from "./components/QuoteDivider";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { quotes } from "./data/portfolio";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen done={loaded} />
      <ScrollProgress />
      <CustomCursor />
      <BackToTop />
      <ChatBot />
      <Navbar />
      <main>
        <Hero />
        <QuoteDivider japanese={quotes[0].japanese} english={quotes[0].english} character={quotes[0].character} characterRole={quotes[0].characterRole} image="/jiriya.png" />
        <About />
        <QuoteDivider japanese={quotes[1].japanese} english={quotes[1].english} character={quotes[1].character} characterRole={quotes[1].characterRole} image="/Naruto.png" />
        <Skills />
        <QuoteDivider japanese={quotes[2].japanese} english={quotes[2].english} character={quotes[2].character} characterRole={quotes[2].characterRole} image="/itachi.png" />
        <Experience />
        <QuoteDivider japanese={quotes[3].japanese} english={quotes[3].english} character={quotes[3].character} characterRole={quotes[3].characterRole} image="/obito.png" />
        <Projects />
        <QuoteDivider japanese={quotes[5].japanese} english={quotes[5].english} character={quotes[5].character} characterRole={quotes[5].characterRole} image="/lee.png" />
        <Education />
        <QuoteDivider japanese={quotes[4].japanese} english={quotes[4].english} character={quotes[4].character} characterRole={quotes[4].characterRole} image="/pain.png" />
        <Certificates />
        <QuoteDivider japanese={quotes[6].japanese} english={quotes[6].english} character={quotes[6].character} characterRole={quotes[6].characterRole} image="/madara.png" />
        <Contact />
        <QuoteDivider japanese={quotes[7].japanese} english={quotes[7].english} character={quotes[7].character} characterRole={quotes[7].characterRole} image="/kakashi.png" />
      </main>
      <Footer />
    </>
  );
}

export default App;
