/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Heading from "../Components/Heading";
import ProjectBlockTemplate from "../Components/ProjectBlockTemplate";
import ProjectTemplate from "../Components/ProjectTemplate";
import styles from "../styles/Projects.module.css";
import useSWR from "swr";
import Footer from "../Components/Footer";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Projects = () => {
  const [show, setShow] = useState();
  const { data, error } = useSWR("/api/getProjects", fetcher);
  const [projects, setProjects] = useState([]);
  const [isOk, setIsOk] = useState("true");
  useEffect(() => {
    if (window.innerWidth <= 900) {
      setShow(false);
    } else {
      setShow(true);
    }
    if (error) {
      setIsOk("false");
    }
    if (!data) {
      setIsOk("Loading...");
    }
    if (data) {
      setIsOk("true");
      setProjects(data.data);
    }
  }, [show, error, data]);
  const project1 = {
    "projectNum": "#01",
    "projectName": "",
    "imgUrl": "/Assets/projects/project1.PNG",
    "projectDescp": "KRYPT - A blockchain based system to transfer ETH !",
    "projectTech": ["Vite", "HardHat", "Solidity" , "React" , "Goerli Testnet"],
    "githubLink": "https://github.com/HarshJaiswani/krypt",
    "liveLink": "https://lgs-krypt.netlify.app/"
  }
  const project2 = {
    "projectNum": "#02",
    "projectName": "Let's Talk - The Chat App",
    "imgUrl": "/Assets/projects/project2.PNG",
    "projectDescp": "A web app to faciliate chatting in group without logging In ! Create room and start talking !",
    "projectTech": ["TailwindCss", "Socket.io", "Express","React","NodeJs"],
    "githubLink": "https://github.com/HarshJaiswani/Let-s-Talk",
    "liveLink": "https://lets-talk-chat-app.netlify.app/"
  }
  const project3 = {
    projectNum: "#03",
    projectName: "Service Based Website",
    imgUrl: "/Assets/projects/project3.PNG",
    projectDescp:
      "This is the website for a legal or organisation firm to display their services and about them to get custmers online",
    projectTech: ["javascript", "html", "css"],
    githubLink: "https://github.com/HarshJaiswani/Service-Website",
    liveLink: "https://harshjaiswani.github.io/Service-Website/",
  };
  return (
    <div className={styles.projects}>
      <Heading
        name="Some things I&#39;ve Built"
        img="projects"
        tagLine="A way to present examples to encourage you. &#39;Not to ShowOff&#39;"
        note="Aspiring to Build Great Things"
      />
      <div className={styles.projectWrapper}>
        {show && project1 && (
          <ProjectTemplate direction="right" getDetails={project1} />
        )}
        {show && project2 && <ProjectTemplate direction="left" getDetails={project2} />}
        {show && project3 && <ProjectTemplate direction="right" getDetails={project3} />}
        {!show && (
          <>
            <ProjectBlockTemplate getDetails={project1} />
            <ProjectBlockTemplate getDetails={project2} />
            <ProjectBlockTemplate getDetails={project3} />{" "}
          </>
        )}
      </div>
      {projects.length > 0 && show ? (
        <h3 className={styles.heading2}>More Crazy Stuff</h3>
      ) : (
        ""
      )}
      {projects.length > 0 && (
        <div className={styles.otherProjects}>
          {isOk == "true" &&
            projects &&
            projects.map((k) => {
              return (
                <>
                  <ProjectBlockTemplate getDetails={k} />
                </>
              );
            })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Projects;
