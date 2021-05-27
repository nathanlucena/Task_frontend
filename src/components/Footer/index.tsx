import React from 'react';
import { SiLinkedin, SiGithub } from "react-icons/si";

import './style.css';

const Footer: React.FC = () => {
  return (
    <div className="footer">
     <a href="https://www.linkedin.com/in/nathan-l-8981b5161/"  rel="noopener noreferrer" target="_blank">Create by: Nathan Lucena </a>
      <div className="social">
        <a href="https://www.linkedin.com/in/nathan-l-8981b5161/"  rel="noopener noreferrer" target="_blank"><SiGithub size={25}/></a>
        <a href="https://github.com/nathanlucena" rel="noopener noreferrer" target="_blank"><SiLinkedin size={25}/></a>
      </div>

    </div>
  );
}

export default Footer;