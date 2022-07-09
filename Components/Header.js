import React, { useEffect , useState } from "react";
import styles from "../styles/Header.module.css";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";
import NavBar from "./NavBar";
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const Header = () => {
  const { data, error } = useSWR('/api/getQuotes', fetcher);
  const [quote , setQuote] = useState("");
  useEffect(() => {
    if (error) {
      let obj = {
        "text": "Learn - Grow - Share",
        "author": "Harsh Jaiswani"
      }
      setQuote(obj);
    }
    if (!data) {
      let obj = {
        "text": "Loading...",
        "author": ""
      }
      setQuote(obj);
    }
    if (data) {
      setQuote(data);
    }
  },[error , data])
  return (
    <div className={styles.mainHead}>
      <NavBar />
      <div className={styles.head}>
        <div className={styles.headSide1}>
          <span>
            <span className={styles.yellowColor}>Le</span>
            <span className="text-gray-500">arn</span>
          </span>
          <span>
            <span className={styles.yellowColor}>Gro</span>
            <span className="text-gray-500">w</span>
          </span>
          <span>
            <span className={styles.yellowColor}>Sh</span>
            <span className="text-gray-500">are</span>
          </span>
        </div>
        <div className={styles.headSide2}>
          <div className={styles.quotes}>
            <span className={styles.quoteLeft}>
              <FaQuoteLeft className="inline-block text-lg mx-2 " />
            </span>
            {quote.text}
            <span className={styles.quoteRight}>
              <FaQuoteRight className="inline-block text-lg mx-2 " />
            </span>
          </div>
          <div className={styles.quoteAuthor}>{quote.author}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
