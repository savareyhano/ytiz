import { useState, useEffect } from "react";
import LinkInput from "../components/LinkInput";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

function Home(props) {
  const [animate, setAnimate] = useState(false);
  const [formattedDLCount, setFormattedDLCount] = useState("");
  const [dlFetchError, setDLFetchError] = useState(false);
  useEffect(() => {
    async function getCount() {
      const { data, error } = await supabase
        .from("Downloads")
        .select()
        .single();
      if (error) {
        console.log(error);
        setDLFetchError(true);
      }
      let count = data["count"];
      count = count.toLocaleString();
      setFormattedDLCount(count);
    }
    getCount();
  }, []);
  const handleCallback = (download) => {
    if (download) setAnimate(true);
    else {
      setAnimate(false);
      async function getCount() {
        const { data, error } = await supabase
          .from("Downloads")
          .select()
          .single();
        if (error) {
          console.log(error);
          setDLFetchError(true);
        }
        let count = data["count"];
        count = count.toLocaleString();
        setFormattedDLCount(count);
      }
      getCount();
    }
  };
  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        ease: "easeInOut",
        duration: 1,
      },
    },
    hide: {
      y: 30,
      opacity: 0,
      transition: {
        delay: 0.1,
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <motion.h1
        key="animation-on-state"
        variants={variants}
        animate={animate ? "hide" : "show"}
        className="z-0 mb-4 select-none bg-gradient-to-b from-text to-text_fade bg-clip-text text-center font-nunito text-5xl font-extrabold text-transparent"
      >
        YTIZ
        <p className="z-0 mt-1 select-none bg-gradient-to-b from-text to-text_fade bg-clip-text text-center font-nunito text-base font-semibold text-transparent opacity-60">
          MP3 Converter for YouTube, SoundCloud, Twitter, and TikTok
        </p>
      </motion.h1>
      <LinkInput
        colorTheme={props.colorTheme}
        className="z-10"
        downloadCallback={handleCallback}
        cumulativeDLCount={formattedDLCount}
      />
      {!dlFetchError && (
        <div className="absolute bottom-8 select-none text-lg font-extrabold text-text opacity-25">
          <p>{formattedDLCount} Files Downloaded!</p>
        </div>
      )}
    </motion.div>
  );
}

export default Home;
