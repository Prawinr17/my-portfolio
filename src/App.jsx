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
        <About />
        <QuoteDivider text={quotes[0].text} author={quotes[0].author} />
        <Skills />
        <QuoteDivider text={quotes[1].text} author={quotes[1].author} />
        <Experience />
        <QuoteDivider text={quotes[2].text} author={quotes[2].author} />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
